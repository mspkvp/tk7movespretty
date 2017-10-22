<template>
    <div class="error-container">
        <h3>404 page not found</h3>
        <p>The page you requested cannot be found.</p>
        <p>Click <router-link :to="{ name: 'index' }">here</router-link> to return to the main page.</p>
    </div>
</template>

<style>
.error-container {
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