<script lang="ts">
  export let progress: number = 0
</script>

<div class="qora-progressbar">
  <div class="progress" style="width: {progress * 100}%" />
</div>

<style lang="scss">
  :host {
    display: block;
  }

  .qora-progressbar {
    --radius: var(--qora-progressbar-radius, 10px);
    --transition-duration: var(--qora-progressbar-transition-duration, 0.2s);
    background: var(
      --qora-progressbar-background-color,
      var(--qora-color-primary-20)
    );
    height: var(--qora-progressbar-height, 4px);
    border-radius: var(--radius);

    .progress {
      height: 100%;
      width: 100%;
      transition: width var(--transition-duration) ease-in-out;
      background: var(
        --qora-progressbar-color,
        var(--qora-color-button-background)
      );
      border-radius: var(--radius);
    }
  }
</style>
