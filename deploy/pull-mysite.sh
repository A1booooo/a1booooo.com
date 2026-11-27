#!/usr/bin/env bash
set -euo pipefail

remote=https://github.com/A1booooo/a1booooo.com.git
releases=/www/wwwroot/mysite-releases
repository=/var/lib/mysite-deploy/artifacts.git
current="$releases/current"

if [[ ! -d "$repository" ]]; then
    git init --quiet --bare "$repository"
fi
timeout 45s git -C "$repository" fetch --quiet --no-tags --depth=1 "$remote" refs/heads/mysite-production
publication="$(git -C "$repository" rev-parse --verify FETCH_HEAD^{commit})"
old_release="$(readlink "$current")"
if [[ "$old_release" == "$publication" ]]; then
    exit 0
fi

workspace="$(mktemp -d "$releases/.deploy.XXXXXX")"
trap 'rm -rf -- "$workspace"' EXIT
release="$releases/$publication"
if [[ ! -d "$release" ]]; then
    candidate="$workspace/release"
    mkdir "$candidate"
    git -C "$repository" archive "$publication" | tar -x -C "$candidate" --no-same-permissions
    if [[ -n "$(find "$candidate" -type l -print -quit)" ]]; then
        echo 'Build contains a symbolic link.' >&2
        exit 1
    fi

    test -s "$candidate/index.html"
    revision="$(cat "$candidate/revision.txt")"
    [[ "$revision" =~ ^[0-9a-f]{40}$ ]]
    mapfile -t assets < <(grep -oE '/assets/[^"[:space:]]+\.(js|css)' "$candidate/index.html")
    if [[ "${#assets[@]}" -lt 2 ]]; then
        echo 'Build has missing entrypoint references.' >&2
        exit 1
    fi
    for asset in "${assets[@]}"; do
        test -s "$candidate$asset"
    done
    mv -T "$candidate" "$release"
fi

move_link() {
    ln -s "$2" "$workspace/link"
    mv -Tf "$workspace/link" "$releases/$1"
}

revision="$(cat "$release/revision.txt")"
curl_site=(curl --noproxy '*' --fail --silent --show-error --max-time 8
    --resolve a1booooo.com:443:127.0.0.1)
move_link previous "$old_release"
move_link current "$publication"
if ! "${curl_site[@]}" https://a1booooo.com/ -o "$workspace/index.html" ||
    ! cmp -s "$workspace/index.html" "$release/index.html" ||
    [[ "$("${curl_site[@]}" https://a1booooo.com/revision.txt)" != "$revision" ]]; then
    move_link current "$old_release"
    echo "HTTPS check failed. Restored $old_release." >&2
    exit 1
fi

printf 'Published source revision %s\n' "$revision"
