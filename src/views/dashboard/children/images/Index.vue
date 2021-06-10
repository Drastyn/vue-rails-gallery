<template>
  <div id="images-index">
    <div class="my-bar ml-4 my-3">
      <router-link
        :to="{ name: 'new_image_path' }"
        class="button is-success ml-2"
      >
        <span>New Image</span>
        <span class="icon">
          <font-awesome-icon icon="plus" />
        </span>
      </router-link>
      <div class="field has-addons ml-2 mr-5">
        <div class="control">
          <input
            type="text"
            class="input is-primary"
            placeholder="Search by name..."
            v-model="searchInput"
          />
        </div>
        <button class="button is-primary" @click="makeSearch()">
          <span class="icon">
            <font-awesome-icon icon="search" />
          </span>
        </button>
        <button v-if="isSearch" class="button is-info ml-3" @click="refresh()">
          <span class="icon">
            <font-awesome-icon icon="sync" />
          </span>
        </button>
      </div>
    </div>
    <div class="columns is-multiline mx-3">
      <div v-if="images.length < 1" class="mt-5 mx-3">
        <h1 class="title is-2">Not image(s) found</h1>
      </div>
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
      searchInput: null,
      isSearch: false,
    };
  },
  computed: {
    ...mapState("images", ["images", "nextPage", "prevPage"]),
  },
  mounted() {
    this.requestImages();
    this.closeModal();
  },
  destroyed() {
    this.$store.dispatch("images/cleanImages");
  },
  methods: {
    requestImages() {
      this.$store.dispatch("images/getImages", {
        page: 1,
      });
    },
    makeSearch() {
      if (this.searchInput) {
        this.$store.dispatch("images/searchImages", {
          page: 1,
          search: this.searchInput,
        });
        this.isSearch = true;
      }
    },
    refresh() {
      this.requestImages();
      this.searchInput = null;
      this.isSearch = false;
    },
    openModal(imageUrl) {
      this.modal.style.display = "block";
      this.imageModal.src = imageUrl;
    },
    closeModal() {
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
    goToPage(page) {
      this.$store.dispatch("images/getImages", {
        page: page,
      });
    },
  },
};
</script>
