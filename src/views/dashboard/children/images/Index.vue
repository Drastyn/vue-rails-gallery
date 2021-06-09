<template>
  <div id="images-index">
    <div class="ml-5 my-3">
      <router-link :to="{ name: 'new_image_path' }" class="button is-success">
        <span>New Image</span>
        <span class="icon">
          <font-awesome-icon icon="plus" />
        </span>
      </router-link>
    </div>
    <div class="columns is-multiline mx-3">
      <div
        class="column is-one-quarter-desktop is-half-tablet"
        v-for="(image, index) in images"
        :key="index"
      >
        <div class="card pointer" @click="openModal(image.url)">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="image.url" :alt="image.name" />
            </figure>
          </div>
          <div class="card-content is-overlay is-clipped">
            <router-link
              class="button is-small is-info"
              :to="{ name: 'show_image_path', params: { token: image.token } }"
            >
              <span>{{ image.name }}</span>
              <span class="icon">
                <font-awesome-icon icon="link" />
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div id="modal" class="modal">
      <div id="modal-background" class="modal-background"></div>
      <div class="modal-content modal-center">
        <p class="image is-3by3">
          <img id="image-modal" alt="modal-image" />
        </p>
      </div>
    </div>
    <div class="my-4 mx-5">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a
          v-if="prevPage"
          @click="goToPage(prevPage)"
          class="pagination-previous nav-button page-button"
        >
          <span class="icon mr-2">
            <font-awesome-icon icon="arrow-left" />
          </span>
          <span>
            Previous Page
          </span>
        </a>
        <a
          v-if="nextPage"
          @click="goToPage(nextPage)"
          class="pagination-next nav-button page-button"
        >
          <span>
            Next Page
          </span>
          <span class="icon ml-2">
            <font-awesome-icon icon="arrow-right" />
          </span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "images-index",
  data() {
    return {
      modal: "",
      modalBackground: "",
      imageModal: "",
    };
  },
  computed: {
    ...mapState("images", ["images", "nextPage", "prevPage"]),
  },
  mounted() {
    this.$store.dispatch("images/getImages", {
      page: 0,
    });
    this.modal = document.getElementById("modal");
    this.modalBackground = document.getElementById("modal-background");
    this.imageModal = document.getElementById("image-modal");
    window.addEventListener("click", (event) => {
      if (event.target === this.modalBackground) {
        this.imageModal.src = "";
        this.modal.style.display = "none";
      }
    });
  },
  destroyed() {
    this.$store.dispatch("images/cleanImages");
  },
  methods: {
    openModal(imageUrl) {
      this.modal.style.display = "block";
      this.imageModal.src = imageUrl;
    },
    goToPage(page) {
      this.$store.dispatch("images/getImages", {
        page: page,
      });
    },
  },
};
</script>

<style></style>
