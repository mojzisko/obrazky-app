<script>
	import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SplitType from 'split-type';

	let textElements = []; // An array to hold multiple text elements
	let rootElement; // This binds to the root element if needed for masking
	let onScreen = true; // Assuming you want to play the animation when the component mounts.

	function registerElement(node) {
		if (node) {
			textElements.push(node);
		}
	}

	onMount(() => {
		if (onScreen) {
			textElements.forEach(textElement => {
				const splitText = new SplitType(textElement, { types: 'words' });
				const tl = gsap.timeline();
				const duration = 1.5;

				tl.fromTo(
					splitText.words,
					{ yPercent: 100 },
					{
						yPercent: 0,
						duration,
						stagger: 0.1,
						ease: 'power2.out',
					},
					0
				)
				.fromTo(
					splitText.words,
					{ autoAlpha: 0 },
					{
						autoAlpha: 1,
						duration: duration / 2,
						stagger: 0.1,
						delay: 0.1,
						ease: 'power1.inOut',
					},
					0
				);
			});

		}
	});

</script>

<header bind:this={rootElement} class="uppercase">
	<div>
		<a href="/">
			<h3 use:registerElement class="ml-6 xl:ml-12 text-sm md:text-xl hover-underline ">Obrázky od Magdalény</h3>
		</a>
	</div>
	<nav class="mr-6 xl:mr-12 text-sm md:text-xl">
		<ul>
			<li>
				<a use:registerElement href="/about-me" class="hover-underline pb-4 relative">
					O mně
				</a>
				
			</li>
		</ul>
	</nav>
	
</header>

<style>
	header {
		display: flex;
		height: 80px;
		align-items: center;
		justify-content: space-between;
	}

	.hover-underline::after {
  content: '';
  display: block;
  width: 0;
  height: 1px; 
  background: currentColor; 
  transition: width 0.5s ease-out;
}

.hover-underline:hover::after {
  width: 100%;
}

	

	
</style>
