<script>
  import { gsap } from "gsap";
  import { hslide } from "$lib/functions.js";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  export let slides;
  export let currentSlideIndex;

  const dispatch = createEventDispatcher();

  const transition_args = {
    duration: 200,
  };

  const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

  console.log("slides", slides);
  console.log("currentSlideIndex", currentSlideIndex);
  // Keyboard navigation
  function handleKeydown(event) {
    if (event.key === "ArrowLeft") {
      prev();
    } else if (event.key === "ArrowRight") {
      next();
    }
  }

  // Touch swipe navigation
  let touchstartX = 0;
  let touchendX = 0;

  let slideElements = []; // To hold references to all slide DOM elements

  // Function to animate slide in from the right or left
  function animateSlideIn(index, direction) {
    gsap.fromTo(
      slideElements[index],
      { x: direction < 0 ? 200 : -200, opacity: 0 }, // Start from right if next, from left if prev
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }

  // Function to animate slide out to the right or left
  function animateSlideOut(currentIndex, direction, onComplete) {
    gsap.to(slideElements[currentIndex], {
      x: direction < 0 ? -200 : 200, // Move to left if next, to right if prev
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onComplete?.();
      },
    });
  }

  function changeSlide(newIndex, direction) {
    const onComplete = () => {
      currentSlideIndex = newIndex;
      animateSlideIn(newIndex, direction);
    };
    animateSlideOut(currentSlideIndex, direction, onComplete);
  }

  function next() {
    let newIndex = (currentSlideIndex + 1) % slides.length;
    changeSlide(newIndex, -1);
  }

  function prev() {
    let newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex, 1);
  }

  // function next() {
  //     currentSlideIndex = clamp(currentSlideIndex + 1, 0, slides.length - 1);
  //   }

  //   function prev() {
  //     currentSlideIndex = clamp(currentSlideIndex - 1, 0, slides.length - 1);
  //   }

  function handleTouchStart(event) {
    touchstartX = event.touches[0].screenX;
  }

  function handleTouchEnd(event) {
    touchendX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  }

  function handleSwipeGesture() {
    if (touchendX < touchstartX) {
      next();
    }
    if (touchendX > touchstartX) {
      prev();
    }
  }

  // Adding event listeners
  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 p-4 flex justify-center items-center z-50"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:click={() => dispatch("close")}
>
  <button
    class="absolute top-4 right-4 text-white"
    on:click={() => dispatch("close")}>Close</button
  >
  {#if currentSlideIndex !== null}
    {#each slides as slide, id (slide.id)}
      {#if id === currentSlideIndex}
        <img
          bind:this={slideElements[id]}
          in:hslide={transition_args}
          out:hslide={transition_args}
          src={slides[currentSlideIndex].url}
          alt={slides[currentSlideIndex].title}
          class="max-w-full max-h-full object-contain z-10 "
        />
      {/if}
    {/each}

    <!-- <div
      class="hslide-container"
      in:hslide={transition_args}
      out:hslide={transition_args}
    >
      <img
        src={slides[currentSlideIndex].url}
        alt={slides[currentSlideIndex].title}
        class="max-w-full max-h-full object-contain"
      />
      <div class="controls">
        <button on:click={prev}>&lt;</button>
        <button on:click={next}>&gt;</button>
      </div>
    </div> -->
  {/if}
</div>

<style>
</style>
