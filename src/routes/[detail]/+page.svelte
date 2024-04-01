<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let data;

  let image = data.image.images;

  let imageElement;

  onMount(() => {
    if (imageElement) {
      gsap.fromTo(
        imageElement,
        {
          scale: 1.04,
          filter: "blur(5px)",
          y: 30,
        },
        {
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  });
</script>

<div class="max-w-[1024px] overflow-hidden">
  <img bind:this={imageElement} src={image.src} />
</div>

<style>
  div {
    margin: 0 auto;
  }
</style>
