<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import SplitType from "split-type";

  let title;

  onMount(() => {
    const splitText = new SplitType(title, { types: "words" });
    const tl = gsap.timeline();
    const duration = 1.5;

    tl.fromTo(
      splitText.words,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration,
        stagger: 0.1,
        ease: "power2.out",
      },
      0
    ).fromTo(
      splitText.words,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: duration / 2,
        stagger: 0.1,
        delay: 0.1,
        ease: "power1.inOut",
      },
      0
    );
  });
</script>

<section class="max-w-4xl mx-auto py-10 md:py-16">
  <h1 bind:this={title} class="text-3xl md:text-5xl text-left">Vítej!</h1>
  <div class="mt-6 space-y-4 text-gray-600">
    <p class="text-base md:text-lg leading-relaxed">
      Moje jméno je Magdaléna. Jsem ráda, že Tě můžu přivítat v mé malé online
      galerii.
    </p>
    <p class="text-base md:text-lg leading-relaxed">
      Malování vnímám jako projev svobody a kreativity. Neexistují zde pro mne
      pravidla. Někdy vím co maluju a jak to má vypadat, a jindy do posledního
      čmárnutí nevím, co bude výsledkem.
    </p>
    <p class="text-base md:text-lg leading-relaxed">
      Moje obrázky jsou často inspirovány nějakou emocí nebo prožitkem - od
      radosti a naděje, přes smutek a melancholii, až po tak trochu dětskou
      zvídavost a lásku.
    </p>
    <p class="text-base md:text-lg leading-relaxed">
      Moje obrázky jsou často inspirovány nějakou emocí nebo prožitkem - od
      radosti a naděje, přes smutek a melancholii, až po tak trochu dětskou
      zvídavost a lásku.
    </p>
    <p class="text-base md:text-lg leading-relaxed">
      Díky za to, že to tu chceš omrknout a přeju Ti spoustu barevných dnů.
    </p>
  </div>
</section>
