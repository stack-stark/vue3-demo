<template>
  <div>
    <a-row>
      <a-col :span="8" offset="8">
        <a-form :model="ruleForm" ref="ruleForm">
          <a-form-item required label="账号">
            <a-input v-model:value="state.ruleForm.account" type="text" autocomplete="off" />
          </a-form-item>
          <a-form-item required label="密码">
            <a-input v-model:value="state.ruleForm.pass" type="password" autocomplete="off" />
          </a-form-item>
          <a-form-item  label="验证码" name="cat">
            <a-input v-model:value="state.ruleForm.cat" type="text" autocomplete="off" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="2" style="margin-top: 70px">
        <img :src="state.captchaImageUrl" @click="getCaptchaImage" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {  defineComponent, onMounted, reactive } from "vue";
import http from "@/services/http/http";
import { AxiosResponse } from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface CaptchaImage {
  code: number;
  img: string;
  msg: string;
  uuid: string;
}

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      captchaImageUrl: "",
      uuid: "",
      ruleForm: {
        pass: "admin",
        account: "admin123",
        cat: "",
      },
    });

    const getCaptchaImage = () => {
      http
        .get("/dev-api/captchaImage")
        .then((res: any) => {
          console.log(res);
          state.captchaImageUrl = "data:image/gif;base64," + res["img"];
          state.uuid = res["uuid"];
        })
        .catch((err: CaptchaImage) => {
          console.error(err);
        });
    };

    onMounted(() => {
      getCaptchaImage();
    });

    

    const login = () => {
      const params = {
        username: "admin",
        password: "admin123",
        code: state.ruleForm.cat,
        uuid: state.uuid,
      };
      http
        .post("/dev-api/login", params)
        .then((res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token)
          store.commit("user/SET_TOKEN", res.token);
          router.push("/index/dashboard");
        })
        .catch((err: CaptchaImage) => {
          console.error(err);
        });
    };

    const submit = () => {
      login();
    };

    return {
      state,
      getCaptchaImage,
      submit,
    };
  },
});
</script>

<style scoped>
</style>