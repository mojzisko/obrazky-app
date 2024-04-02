<script>
  import { onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import ModalSlider from "./ModalSlider.svelte";
  let showModal = false;
  export let currentSlideIndex = null;

  function openModal(index) {
    currentSlideIndex = index;
    showModal = true;
  }

  function inViewport(node) {
    const opacity = tweened(0, { duration: 1500, easing: cubicOut });
    const scale = tweened(1.05, { duration: 1500, easing: cubicOut });
    const blur = tweened(5, { duration: 1500, easing: cubicOut });

    opacity.subscribe((value) => (node.style.opacity = value));
    scale.subscribe((value) => (node.style.transform = `scale(${value})`));
    blur.subscribe((value) => (node.style.filter = `blur(${value}px)`));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            opacity.set(1);
            scale.set(1);
            blur.set(0);
            observer.unobserve(node); // Optional: Stop observing once animation starts
          }
        });
      },
      { threshold: 0.1 }
    ); // Adjust threshold as needed

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  let artImages = [
    { id: 1, url: "images/2.jpg", title: "Artwork 1", href: "/1" },
    { id: 2, url: "images/4.jpg", title: "Artwork 2", href: "/2" },
    { id: 3, url: "images/6.jpg", title: "Artwork 2", href: "/3" },
    { id: 4, url: "images/8.jpg", title: "Artwork 2", href: "/4" },
    { id: 5, url: "images/10.jpg", title: "Artwork 2", href: "/5" },
    { id: 6, url: "images/12.jpg", title: "Artwork 2", href: "/6" },
    { id: 7, url: "images/14.jpg", title: "Artwork 2", href: "/7" },
    { id: 8, url: "images/16.jpg", title: "Artwork 2", href: "/8" },
    { id: 9, url: "images/18.jpg", title: "Artwork 2", href: "/9" },
    { id: 10, url: "images/20.jpg", title: "Artwork 2", href: "/10" },
    { id: 11, url: "images/21.jpg", title: "Artwork 2", href: "/11" },
    { id: 12, url: "images/22.jpg", title: "Artwork 2", href: "/12" },
    { id: 13, url: "images/23.jpg", title: "Artwork 2", href: "/13" },
    { id: 14, url: "images/24.jpg", title: "Artwork 2", href: "/14" },
    { id: 15, url: "images/25.jpg", title: "Artwork 2", href: "/15" },
    { id: 16, url: "images/26.jpg", title: "Artwork 2", href: "/16" },
  ];

  function hoverEffect(node) {
    const handleMouseEnter = () => {
      node.style.transition = "transform 2s ease-in-out";
      node.style.transform = "scale(1.04)";
    };
    const handleMouseLeave = () => {
      node.style.transition = "transform 2s ease-in-out";
      node.style.transform = "scale(1)";
    };
    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return {
      destroy() {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      },
    };
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Obrázky od Magdalény" />
  {#if showModal}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<section>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {#each artImages as image, index (image.id)}
      <a class="overflow-hidden" on:click={() => openModal(index)}>
        <img
          use:hoverEffect
          use:inViewport
          src={image.url}
          alt={image.title}
          class="w-full h-auto  hover:cursor-pointer"
        />
      </a>
    {/each}
  </div>
  {#if showModal}
    <ModalSlider
      on:close={() => (showModal = false)}
      slides={artImages}
      {currentSlideIndex}
    />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
    position: relative;
  }

  h1 {
    width: 100%;
  }

  img {
    opacity: 0; /* Maintain initial opacity to 0 for the fade-in effect */
  }
</style>
