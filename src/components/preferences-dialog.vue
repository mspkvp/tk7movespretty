<template>
    <div id="preferences" class="preferences-dialog">
    	<div class="pref-title disable-select">
    		Preferences
    	</div>
    	<table class="pref-list">
    		<tr class="pref-language">
    			<td class="pref-id disable-select">Language</td>
    			<td class="pref-selection">
    				<select id="lang-select" onchange="setLang(this.value)">
    					<option value="1" selected="">English</option>
    					<option value="6">Deutsch</option>
    					<option value="4">Français</option>
    					<option value="5">Italiano</option>
    					<option value="11">한국어</option>
    					<option value="7">Español</option>
    					<option value="10">繁體中文</option>
    					<option value="8">русский</option>
    					<option value="0">日本語</option>
    					<option value="9">العربية</option>
    					<option value="3">Português-Brasil</option>
    			  	</select>
    			</td>
    		</tr>
    		<tr class="pref-platform">
    			<td class="pref-id disable-select">Button Layout</td>
    			<td class="pref-selection">
    				<select id="platf-select" onchange="changePlatform(this.value)">
    				    <option value="STEAM">Arcade/Steam</option>
    				    <option value="PS4">Playstation</option>
    				    <option value="XBOX" selected="">Xbox</option>
    			  	</select>
    			</td>
    		</tr>
    	</table>
    	<div class="pref-close disable-select" onclick="togglePreferences()"><i class="fa fa-times" aria-hidden="true"></i></div>
    </div>
</template>

<script>
export default {

}
</script>