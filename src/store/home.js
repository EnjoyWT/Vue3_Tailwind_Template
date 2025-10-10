import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { homeService } from "@/api/home";

// 使用 Composition API 风格的现代写法
export const useHomeInfoStore = defineStore(
  "homeInfo",
  () => {
    // 状态 - 使用 ref
    const userId = ref("3333");
    const username = ref("赫赫333444");
    const age = ref(30);
    const like = ref("girl");
    const obj = ref({ money: 100, friend: 10 });
    const hobby = ref([
      { id: 1, name: "篮球", level: 1 },
      { id: 2, name: "rap", level: 10 },
    ]);

    // 计算属性 - 使用 computed
    const userInfo = computed(() => ({
      userId: userId.value,
      username: username.value,
      age: age.value,
      like: like.value,
    }));

    // 方法
    const setUser = (user) => {
      userId.value = user.userId;
      username.value = user.username;
      age.value = user.age;
      like.value = user.like;
      obj.value = user.obj;
      hobby.value = user.hobby;
    };

    const getRemoteUser = async (userIdParam) => {
      try {
        const response = await homeService({ id: userIdParam });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // 返回所有需要暴露的状态和方法
    return {
      // 状态
      userId,
      username,
      age,
      like,
      obj,
      hobby,
      // 计算属性
      userInfo,
      // 方法
      setUser,
      getRemoteUser,
    };
  },
  {
    // 持久化配置 - 自动处理本地存储
    persist: {
      key: "home-info-store",
      storage: localStorage,
      // 可以选择性持久化某些字段
      paths: ["userId", "username", "age", "like", "obj", "hobby"],
    },
  }
);

export default useHomeInfoStore;
