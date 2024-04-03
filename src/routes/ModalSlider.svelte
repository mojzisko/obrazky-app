<script>
  import gsap from "gsap";
  import { createEventDispatcher, onMount } from "svelte";

  export let slides;
  export let currentSlideIndex;

  const dispatch = createEventDispatcher();
  let slideElements = [];

  onMount(() => {
    gsap.set(slideElements, { opacity: 0 });
    gsap.to(slideElements[currentSlideIndex], { opacity: 1, duration: 0.5 });

    const handleKeydown = (event) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  });

  let startX,
    startY,
    isSwiping = false;

  function handleTouchStart(event) {
    // Reset swiping status on each touch start
    isSwiping = false;

    // Proceed only for single touch events
    if (event.touches.length === 1) {
      startX = event.touches[0].screenX;
      startY = event.touches[0].screenY;
      isSwiping = true; // Assume swiping until proven otherwise
    }
  }

  function handleTouchMove(event) {
    // Optional: Implement logic here if you need to handle touch move specifically
  }

  function handleTouchEnd(event) {
    if (!isSwiping || event.changedTouches.length > 1) {
      // Not a swipe or end of a multi-touch event, no action required
      return;
    }

    const endX = event.changedTouches[0].screenX;
    const endY = event.changedTouches[0].screenY;
    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      // Confirmed horizontal swipe action
      if (diffX < 0) next();
      else prev();
    }
    // Reset swiping status after handling touch end
    isSwiping = false;
  }

  function next() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    slideTo(newIndex);
  }

  function prev() {
    const newIndex = (currentSlideIndex + slides.length - 1) % slides.length;
    slideTo(newIndex);
  }

  function slideTo(index) {
    const opacityOut = { opacity: 0, duration: 0.5, ease: "power1.out" };
    const opacityIn = { opacity: 1, duration: 0.5, ease: "power1.in" };

    gsap.to(slideElements[currentSlideIndex], opacityOut);
    gsap.fromTo(slideElements[index], { opacity: 0 }, opacityIn);

    currentSlideIndex = index;
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 p-4 flex justify-center items-center z-50"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:click={() => dispatch("close")}
>
  <button
    class="absolute top-4 right-4 text-white z-20"
    on:click={(event) => {
      event.stopPropagation();
      dispatch("close");
    }}
  >
    Close
  </button>
  {#each slides as slide, i (slide.id)}
    <img
      bind:this={slideElements[i]}
      src={slide.url}
      alt={slide.title}
      class="max-w-full max-h-full object-contain absolute"
      style="opacity: 0;"
    />
  {/each}
</div>
