<template>
  <div id="login" class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <div class="box">
            <h2 class="title">Log in</h2>
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input
                    type="text"
                    v-model="name"
                    class="input"
                    placeholder="Username"
                    autofocus
                  />
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      type="password"
                      v-model="password"
                      class="input"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button type="submit" class="button is-fullwidth">
                      Get in
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <FlashMessage :position="'right bottom'" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      name: null,
      password: null,
    };
  },
  computed: {
    ...mapState("notifications", ["notification"]),
  },
  mounted() {
    this.removeVuexInStorage();
  },
  destroyed() {
    this.$store.dispatch("notifications/cleanNotification");
  },
  methods: {
    removeVuexInStorage() {
      window.sessionStorage.removeItem("vuex");
    },
    display(message) {
      this.$store.dispatch("notifications/loginMessage", message);
      this.flashMessage.show(this.notification);
    },
    login() {
      if (this.name && this.password) {
        this.user = {
          name: this.name,
          password: this.password,
        };
        this.$store
          .dispatch("doLogin", this.user)
          .then((response) => {
            this.display("You have successfully logged in");
            this.$router.push({ name: response.path });
          })
          .catch(() => {
            this.display("Invalid credentials, retry again please");
            this.removeVuexInStorage();
          });
      }
    },
  },
};
</script>
