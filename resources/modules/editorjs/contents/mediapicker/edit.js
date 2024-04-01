export default ({ target, img, id }) => `<div class="flex items-center gap-x-8 ${target}">
  <div class="avatar " placeholder="null">
    <div class="bg-neutral w-24 mask rounded">
      <img src="${img}" alt="">
    </div>
  </div>
  <input type="hidden" class="input" name="${target}" id="${target}" value="${id}">

  <div>
    <a role="button" href="/admin/mediapicker?target=${target}&amp;entity=articles&amp;types%5B0%5D=image%2Fjpeg&amp;types%5B1%5D=image%2Fpng&amp;types%5B2%5D=image%2Fwebp&amp;name=${target}" up-layer="new" up-mode="drawer" up-size="grow" up-accept-location="/admin/mediapicker/*" up-on-accepted="up.render('.${target}', { response: event.response })" up-history="false" class="btn btn-primary btn-sm normal-case">
      Change media
    </a>
    <a role="button" href="/admin/mediapicker/create?target=${target}&amp;entity=articles" up-target=".${target}" class="btn btn-link btn-xs text-error normal-case">
      Delete
    </a>

    <p class="mt-2 text-xs leading-5 text-warning">
      jpg, png or webp. 1O MB max.
    </p>
  </div>
</div>
`
