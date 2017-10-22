<template>
    <div class="footer disable-select">
		<p>
		    <a href="https://github.com/mspkvp/tk7movespretty" target="_blank" style="text-decoration:none;color:#ffffff;">
		        <i class="fa fa-github" aria-hidden="true"></i> mspkvp
	        </a>
	        <span v-html="year"></span> |
	        <span v-html="gui"></span> |
	        <span v-html="copyright"></span>
        </p>
	</div>
</template>

<script>
export default {
    data() {
        return {
            year: '&copy;2017',
            gui: "Fanmade & based on TEKKEN&trade;7's GUI",
            copyright: 'All game images are under TEKKEN&trade;7 & &copy;2017 BANDAI NAMCO Entertainment, Inc. copyright protection.',
        }
    }
};
</script>