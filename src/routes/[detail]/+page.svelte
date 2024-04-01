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

<div>
  <img
    bind:this={imageElement}
    src={image.src}
    class="md:mt-10 md:translate-y-0"
    alt="An elegant description"
  />
</div>

<style>
  div {
    margin: 0 auto;
    height: calc(100svh - 114px);
    display: flex;
    align-items: center;
  }
</style>
