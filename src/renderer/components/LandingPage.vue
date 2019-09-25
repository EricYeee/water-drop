<template>
  <div id="wrapper">
      <div class="center-box">
          <p class="center-box-title">Hello, this is Water-Drop</p>
          <div class="center-box-button">START</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    methods: {

    },
  };
</script>

<style lang="scss">
  // @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Verdana', 'Arial', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: center;
    .center-box {
      border: 1px solid red;
      .center-box-title {
        font-size: 30px;
        font-weight: lighter;
      }
    }
  }
</style>
