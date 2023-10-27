export default `<div class="flex items-center gap-x-8 {target}">
  <div class="avatar  placeholder" placeholder="">
    <div class="bg-neutral w-24 mask rounded">
      <span></span>
    </div>
  </div>
  <input type="hidden" class="input" name="{target}" id="{target}" value="">

  <div>
    <a role="button" href="/admin/mediapicker?target={target}&amp;entity=articles&amp;types%5B0%5D=image%2Fjpeg&amp;types%5B1%5D=image%2Fpng&amp;name={target}" up-layer="new" up-mode="drawer" up-size="grow" up-accept-location="/admin/mediapicker/*" up-on-accepted="up.render('.{target}', { response: event.response })" up-history="false" class="btn btn-primary btn-sm normal-case">
      Add media
    </a>

    <p class="mt-2 text-xs leading-5 text-warning">
      jpg, png or webp. 1O MB max.
    </p>
  </div>
</div>
`
