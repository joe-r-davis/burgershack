// Vuex 'store': Sets and maintains front-end application 'state'

import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import router from "../router";

var baseUrl = "//localhost:5000/";

var api = axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
});

var auth = axios.create({
  baseURL: baseUrl + "Account/",
  timeout: 3000,
  withCredentials: true
});

vue.use(vuex);

export default new vuex.Store({
  state: {
    user: {},
    authError: {
      error: false,
      message: ""
    }
  },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      setAuthError(state, error) {
        state.authError = {
          error: error.error,
          message: error.message
        };
      }
    },
    actions: {
      // Auth
      registerUser({ commit, dispatch }, user) {
        debugger
        console.log("user here?")
        auth
          .post("register", user)
          .then(res => {
            var newUser = res.data;
            commit("setUser", newUser);
            commit("setAuthError", { error: false, message: "" });
            router.push({
              name: "Home"
            });
          })
          .catch(err => {
            console.log(err);
            commit("setAuthError", {
              error: true,
              message:
                "Register failed: Invalid username, email, or password given"
            });
          });
      },

      editUser({ commit, dispatch }, user) {
        api
          .put("users/" + user._id, user)
          .then(res => {
            var updatedUser = res.data;
            commit("setUser", updatedUser);
          })
          .catch(err => {
            console.log(err);
          });
      },

      loginUser({ commit, dispatch }, user) {
        auth
          .post("login", user)
          .then(res => {
            var newUser = res.data;
            console.log("logged-in user:", newUser);
            commit("setUser", newUser);
            commit("setAuthError", { error: false, message: "" });
            router.push({
              name: "Home"
            });
          })
          .catch(err => {
            console.log(err);
            commit("setAuthError", {
              error: true,
              message: "Log-in failed: Invalid username or password"
            });
          });
      },

      authenticateUser({ commit, dispatch }) {
        auth
          .get("authenticate")
          .then(res => {
            var sessionUser = res.data;
            console.log("returning user:", sessionUser);
            commit("setUser", sessionUser);
          })
          .catch(err => {
            console.error(err);
          });
      },

      logoutUser({ commit, dispatch }) {
        auth
          .delete("logout")
          .then(() => {
            console.log("User logged out");
            commit("setUser", {});
            commit("setAuthError", { error: false, message: "" });
            router.push({
              name: "Welcome"
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      getUserById({ commit, dispatch }, user) {
        api
          .get("users/" + user._id, user)
          .then(res => {
            var foundUser = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
    }
});
