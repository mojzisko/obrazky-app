<script>
  import gsap from "gsap";
  import { createEventDispatcher, onMount } from "svelte";

  export let slides;
  export let currentSlideIndex;

  const dispatch = createEventDispatcher();
  let slideElements = [];

  onMount(() => {
    gsap.set(slideElements, {
      xPercent: (i) => (i === currentSlideIndex ? 0 : 100),
      opacity: 0,
    });
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
    isPinching = false;

  function handleTouchStart(event) {
    if (event.touches.length === 2) {
      // Pinch start
      isPinching = true;
      startX = (event.touches[0].screenX + event.touches[1].screenX) / 2;
      startY = (event.touches[0].screenY + event.touches[1].screenY) / 2;
    } else if (event.touches.length === 1) {
      // Swipe start
      isPinching = false;
      startX = event.touches[0].screenX;
      startY = event.touches[0].screenY;
    }
  }

  function handleTouchEnd(event) {
    if (isPinching || event.touches.length > 0) {
      // End of pinch or multi-touch, no swipe action should be taken
      isPinching = false;
      return;
    }

    // Calculate swipe direction and trigger slide change if needed
    const endX = event.changedTouches[0].screenX;
    const endY = event.changedTouches[0].screenY;
    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX < 0) next();
      else prev();
    }
  }

  function next() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    slideTo(newIndex, "next");
  }

  function prev() {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    slideTo(newIndex, "prev");
  }

  function slideTo(index, direction) {
    // Simplified for brevity; include your slide transition logic here
    currentSlideIndex = index;
  }
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
    }}
  >
    Close
  </button>
  {#each slides as slide, i (slide.id)}
    <img
      bind:this={slideElements[i]}
      src={slide.url}
      alt={slide.title}
      class="max-w-full max-h-full object-contain absolute transition-opacity duration-500 ease-in-out"
      style="opacity: 0;"
    />
  {/each}
</div>
