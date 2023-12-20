<script setup>
// import MyIcon from './MyIcon.vue';
import ChatInput from './ChatInput.vue'
import AIReply from './AIReply.vue'
import UserRequest from './UserRequest.vue'
const testData = [
{id: 1, content: "Hi there my name is Afam"},
{id: 2, content: "Hello I'm Big Chef your cooking and gourment guide.I can help you with recipes and reverse engineer dishes for you. What would you like to know today?"},
{id: 3, content: "Suppose I give you fenugreek, curry, tumeric, what can you whip up for me? I saw this recipe I've been meaning to try out but I don't have enough"},
{id: 4, content: `Certainly! Here's a recipe for a flavorful and healthy dish using fenugreek, turmeric, and sage: "Spiced Turmeric Lentil Soup."

Spiced Turmeric Lentil Soup
Ingredients:
1 cup dry red lentils, rinsed
1 large onion, finely chopped
3 cloves garlic, minced
1 carrot, diced
1 celery stalk, diced
1 tablespoon olive oil
1 teaspoon ground turmeric
1 teaspoon ground fenugreek
1 teaspoon dried sage
1 teaspoon cumin powder
1/2 teaspoon coriander powder
1/4 teaspoon cayenne pepper (adjust to taste)
6 cups vegetable broth
1 can (14 oz) diced tomatoes
Salt and pepper to taste
Fresh cilantro or parsley for garnish
Lemon wedges for serving
Instructions:
Prepare Lentils:

Rinse the red lentils under cold water until the water runs clear.
Set aside.
Sauté Aromatics:

In a large pot, heat olive oil over medium heat.
Add chopped onion, garlic, carrot, and celery. Sauté until the vegetables are softened.
Add Spices:

Stir in ground turmeric, fenugreek, sage, cumin, coriander, and cayenne pepper. Cook for a minute to release the flavors.
Combine Lentils and Broth:

Add the rinsed red lentils to the pot and pour in the vegetable broth.
Bring the mixture to a boil, then reduce heat to low. Simmer uncovered for about 20-25 minutes or until lentils are tender.
Add Tomatoes:

Pour in the diced tomatoes with their juices. Stir to combine.
Season and Garnish:

Season the soup with salt and pepper to taste.
Garnish with fresh cilantro or parsley.
Serve:

Ladle the soup into bowls and serve with lemon wedges on the side.
Optionally, you can serve the soup over cooked rice or with a slice of crusty bread.
This spiced lentil soup is not only delicious but also packed with the health benefits of turmeric, fenugreek, and sage. Adjust the spice levels according to your preference, and enjoy a warm, comforting bowl of goodness!`, 
image: "/background.jpg"},
{id: 5, content: "Thanks! I'll try it out But what went into making this particular food?", image: "/test.jpg"},
{id: 6, content: "Certainly! Here's a recipe for a flavorful and healthy dish using fenugreek, turmeric, and sage: \"Spiced Turmeric Lentil Soup.\""},

]
</script>
<template>
  <section class="chat-layer">
    <!--Implement infinte scrolling, also the list will have it's own component for rendering
        my messages and the ai's replies-->
    <ul class="chat-body">
      <li v-for="item in testData" :key="item.id">
        <component 
          :is="item.id % 2 !== 0 ? UserRequest : AIReply" v-bind="item" />
      </li>
    </ul>
    <ChatInput />
  </section>
</template>
<style scoped>
.chat-layer {
  height: calc(100vh - 60px);
  position: absolute;
  bottom: 0;
  right: 0;
  top: 60px;
  width: calc(100vw - 280px);
  display: flex;
  align-self: stretch;
  flex-flow: column;
  align-items: center;
  padding: 0 30px;
  overflow: auto;
}
.chat-body {
  max-width: 700px;
  padding: 0;
  width: 100%;
  /* background: greenyellow; */
  margin-bottom: 120px;
}
.chat-body li {
  list-style: none;
  padding: 20px;
  padding-bottom: 0;
  width: 100%;
  /* background: red; */
}
@media screen and (max-width: 768px) {
  .chat-layer {
    height: calc(100vh - 50px);
    width: 100%;
    padding: 0;
    top: 50px;
  }
}
</style>
