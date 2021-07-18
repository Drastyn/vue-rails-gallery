<template>
  <div id="card" class="card pointer" @click="openModal(image.url)">
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
</template>

<script>
export default {
  name: "card",
  props: ["image"],
  data() {
    return {
      modal: "",
      modalBackground: "",
      imageModal: "",
    };
  },
  mounted() {
    this.closeModal();
  },
  methods: {
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
    openModal(imageUrl) {
      this.modal.style.display = "block";
      this.imageModal.src = imageUrl;
    },
  },
};
</script>
