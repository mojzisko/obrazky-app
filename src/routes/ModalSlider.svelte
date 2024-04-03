<script>
  import gsap from "gsap";
  import { createEventDispatcher, onMount } from "svelte";

  export let slides;
  export let currentSlideIndex;

  const dispatch = createEventDispatcher();
  let slideElements = [];

  // GSAP animations for slide transitions
  function slideTo(index, direction) {
    const distance = direction === "next" ? 100 : -100;
    const currentElement = slideElements[currentSlideIndex];
    const nextElement = slideElements[index];

    // Animate out the current slide
    gsap.to(currentElement, {
      xPercent: -distance,
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    });

    // Animate in the new slide
    gsap.fromTo(
      nextElement,
      { xPercent: distance, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.7, ease: "power1.inOut" }
    );

    currentSlideIndex = index;
  }

  function next() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    slideTo(newIndex, "next");
  }

  function prev() {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    slideTo(newIndex, "prev");
  }

  let touchstartX = 0;
  let touchstartY = 0; // For vertical swipe detection
  let touchendX = 0;
  let touchendY = 0; // For vertical swipe detection

  function handleTouchStart(event) {
    touchstartX = event.touches[0].screenX;
    touchstartY = event.touches[0].screenY; // Capture starting Y coordinate
  }

  function handleTouchEnd(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY; // Capture ending Y coordinate

    // Calculate the differences in X and Y
    const diffX = touchendX - touchstartX;
    const diffY = touchendY - touchstartY;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Proceed with the swipe if it's predominantly horizontal
      if (diffX < 0) {
        next();
      } else {
        prev();
      }
    }
    // If the vertical movement is greater, do nothing (ignore the swipe)
  }

  onMount(() => {
    gsap.set(slideElements, { xPercent: 100, opacity: 0 });
    gsap.set(slideElements[currentSlideIndex], { xPercent: 0, opacity: 1 });

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    });
  });
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 p-4 flex justify-center items-center z-50"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:click={() => dispatch("close")}
>
  <button
    class="absolute top-4 right-4 text-white z-20"
    on:click={(event) => {
      event.stopPropagation();
      dispatch("close");
    }}>Close</button
  >
  {#each slides as slide, i (slide.id)}
    <img
      bind:this={slideElements[i]}
      src={slide.url}
      alt={slide.title}
      class="max-w-full max-h-full object-contain absolute"
      style="opacity: 0; transition: opacity 0.5s ease;"
    />
  {/each}
</div>

<style>
</style>
