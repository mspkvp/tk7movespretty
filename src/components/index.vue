<template>
    <div class="index-container">
        <p>
            Good learning resources seem to be *scattered around the web*, so this project aims to build a nice reference to either newbies or veterans who wish to learn and improve their skill and game knowledge.
        </p>

        <p>
            Click <router-link :to="{ name: 'character', params: { characterSlug: 'akuma' } }">here</router-link> to go to the character list!
        </p>

        <p>
            This is not possible without the help of very generous people within our Tekken community, for their feedback and contributions.
        </p>

        <h3>A huge thanks to:</h3>

        <ul>
            <li><a href="https://toolassisted.github.io/T7/">TOOLASSlSTED</a>
            <li><a href="https://github.com/Humberto-Zayas">Humberto-Zayas@github</a> or
                <a href="https://twitter.com/Humberto_zayas">Humberto_zayas@twitter]</a>
            <li><a href="https://reddit.com/r/tekken">/r/Tekken</a></li>
        </ul>

        <p style="text-align: center;">
            <img src="/assets/img/logo2.png" width="300"/>
        </p>
    </div>
</template>

<style>
.index-container {
    color: #fff;
    font-family: "Core Sans G",Arial,sans-serif;
    border: 2px solid rgba(12,73,90,.75);
    background-color: rgba(0,0,0,.5);
    margin: 10px;
    padding: 10px;
}
</style>

<script>
export default {

};
</script>