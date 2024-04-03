<script>
  import gsap from "gsap";
  import { createEventDispatcher, onMount } from "svelte";

  export let slides;
  export let currentSlideIndex;

  const dispatch = createEventDispatcher();
  let slideElements = [];

  onMount(() => {
    // Initially hide all slides except the current one
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

  function slideTo(index, direction) {
    const distance = direction === "next" ? 100 : -100;
    gsap.to(slideElements[currentSlideIndex], {
      xPercent: -distance,
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    });
    gsap.fromTo(
      slideElements[index],
      { xPercent: distance, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.7, ease: "power1.out" }
    );
    currentSlideIndex = index;
  }

  function next() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    slideTo(newIndex, "next");
  }

  function prev() {
    const newIndex = (currentSlideIndex + slides.length - 1) % slides.length;
    slideTo(newIndex, "prev");
  }

  let startX, startY, endX, endY;

  function handleTouchStart(event) {
    if (event.touches.length === 1) {
      startX = event.touches[0].screenX;
      startY = event.touches[0].screenY;
    }
  }

  function handleTouchEnd(event) {
    if (event.changedTouches.length === 1) {
      endX = event.changedTouches[0].screenX;
      endY = event.changedTouches[0].screenY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
        if (diffX < 0) next();
        else prev();
      }
    }
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
