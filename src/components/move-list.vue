<template>
    <div class="char-movelist">
        <div class="head disable-select">
        	<div class="char-menu-open" onclick="toggleCharMenu()">
        		<i class="fa fa-exchange" aria-hidden="true"></i>
        	</div>
    		<div id="selected-title" class="move-head">Kazumi Mishima</div>
    		<div class="opt-buttons">
    			<div class="btn-preferences" onclick="togglePreferences()">Preferences</div>
    			<div class="btn-filter" onclick="toggleFilter()">Filter</div>
    		</div>
        </div>
        <div id="movelist_tab" class="inner-table">
    		<table class="move-table">
    			<tr>
    			    <td class="move-card">
    			        <div class="move-info">
    			            <div class="move-number">80</div>
    			            <div class="move-title">
    			                <div class="move-name">Sample Combo 1</div>
    			                <div class="move-hitamount">5 Hits</div>
    			            </div>
    			            <div class="move-string"><img class="move-arrow" src="/assets/arrow/d.svg"><img class="move-button" src="/assets/button/XBOX/3.svg">
    			                <p class="move-hint">(Clean</p>
    			                <p class="move-hint">Hit)</p>
    			                <!--
    			                <p class="move-hint" style="color:#37ff05;font-size:20px;"><i class="fa fa-chevron-right" aria-hidden="true"></i></p><img class="move-arrow" src="./assets/arrow/d.svg"><img class="move-arrow" src="./assets/arrow/db.svg"><img class="move-arrow" src="./assets/arrow/b.svg"><img class="move-button" src="./assets/button/XBOX/3.svg">
    			                <p class="move-hint" style="color:#37ff05;font-size:20px;"><i class="fa fa-chevron-right" aria-hidden="true"></i></p><img class="move-arrow" src="./assets/arrow/f.svg"><img class="move-arrow" src="./assets/arrow/d.svg"><img class="move-arrow" src="./assets/arrow/df.svg"><img class="move-button" src="./assets/button/XBOX/2.svg"></div>
    		                    -->
    	                    </div>
    			            <div class="move-hit-dmg">
    			                <div class="move-hitlvlstring">
    			                    <p class="mv-hitlvl hitlow">Low</p><i class="fa fa-chevron-right" aria-hidden="true"></i>
    			                    <p class="mv-hitlvl hithigh">High</p><i class="fa fa-chevron-right" aria-hidden="true"></i>
    			                    <p class="mv-hitlvl hitproj">Proj</p><i class="fa fa-chevron-right" aria-hidden="true"></i>
    			                    <p class="mv-hitlvl hitproj">Proj</p><i class="fa fa-chevron-right" aria-hidden="true"></i>
    			                    <p class="mv-hitlvl hitproj">Proj</p>
    			                </div>
    			                <div class="move-dmg">
    			                    <p class="mv-frames">35</p>
    			                    <p class="mv-id">Damage</p>
    			                    <div class="move-hitdmg-section"><i id="dmgmove80" class="fa fa-plus-square" aria-hidden="true"></i>
    			                        <div class="move-hitdmg">10+10+4+3+8</div>
    			                    </div>
    			                </div>
    			            </div>
    			        </div>
    			        <div class="move-extra">
    			            <div class="mv-section">
    			                <div class="move-special"></div>
    			                <table class="move-frames">
    			                    <tbody>
    			                        <tr class="move-startf">
    			                            <td class="mv-id">Start</td>
    			                            <td class="mv-frames">15F</td>
    			                        </tr>
    			                        <tr class="move-startf-seg">
    			                        	<td>20F = 5+5+5+5</td>
    			                        </tr>
    			                        <tr class="move-blockf">
    			                            <td class="mv-id">Block</td>
    			                            <td class="mv-frames blknegative">-34</td>
    			                        </tr>
    			                        <tr class="move-hitf">
    			                            <td class="mv-id">Hit</td>
    			                            <td class="mv-frames">+37</td>
    			                        </tr>
    			                    </tbody>
    			                </table>
    			            </div>
    			        </div>
    			    </td>
    			</tr>
    		</table>
    	</div>
    </div>
</template>

<script>
export default {

}
</script>