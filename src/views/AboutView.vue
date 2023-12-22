<script setup>
import MyHeader from '@/components/MyHeader.vue'
</script>
<template>
  <div class="about">
    <MyHeader />
    <main>
      <div>
      <h2> Why Secret Formula?</h2>
      <p>
        Secret formula is a little project between two devs. We live in a world where AI is
        increasingly shaping every aspect and fabric of our lives. Recently Google released another
        one, Gemini AI which offered a lot of capabilities for multimodal prompting and so it got us
        thinking, What about food, because food is one fo the hardest things to identify in terms of
        data. Recipes have to be right, there are shocking histories, and the like. So it made
        perfect sense to see what gemini could do for us. And so we found the Secret Formula.
      </p>
      <p>
        This is an AI powered all in one cooking assistant able to generate recipes, identify and
        explain food as well as reverse engineer recipes from images of already made food. It is a
        work in progress and we hope to refine it and make it much more capable, much more efficient
        and much more accurate
      </p>
      </div>
      <footer>
        <ul>
          <li><h3>Disclaimer</h3></li>
          <li>Secret Formula is powered by Gemini AI and True Lens</li>
          <li>Mistakes do occur. Double check your recipes before you cook up something nasty</li>
        </ul>
      </footer>
    </main>


  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-flow: column;
}
.about:first-child {
  z-index: 1;
}
main {
  position: fixed;
  top: 60px;
  z-index: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc(100vh - 60px);
  overflow: scroll;
  border: 1px solid red;
}
main > div {
  /* background: */
  display: flex;
  flex-flow: column;

  flex: 1 0 inherit;
}

h2 {
  font-family: "Space Grotesk";
  padding: 30px;
}
main p {
  width: 100%;
  margin-bottom: 30px;
  padding:0 30px;

}
footer {
  flex-shrink: 0;
  flex-grow: 0;
  width: fit-content;
  align-self: flex-end;
  padding: 30px 50px;
  background-color: #e99e3d;
  width: 100%;
  color: white;
  font-family: "Space Grotesk";
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  font-weight: 500;
}
footer h3 {
  font-weight: 600;
}
footer ul {
  list-style-type: none;
  /* max-width: 350px; */
}
footer li {
  font-size: 13px;
  font-family: "IBM Plex Sans";
  margin-bottom: 10px;
}
@media screen and (max-width: 768px) {
  main {
    height: calc(100vh - 50px);
    top: 50px;
  }
}
</style>
