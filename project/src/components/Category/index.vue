<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select :disabled="!scene" v-model="categoryStore.c1Id" @change="getC2" style="width: 220px;">
            <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select :disabled="!scene" v-model="categoryStore.c2Id" @change="getC3" style="width: 220px;">
            <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select :disabled="!scene" v-model="categoryStore.c3Id" style="width: 220px;">
            <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script setup lang="ts">
 import { onBeforeUnmount, onMounted } from 'vue';
 //引入分类相关的仓库
 import useCategoryStore from '../../store/modules/category';
 let categoryStore = useCategoryStore();
 //分类组件挂载完毕后，请求一级分类数据
 onMounted(() => {
  getC1();
 });
//请求一级分类数据方法
 const getC1 = () => {
   categoryStore.getC1();
 }
 //:当一级分类发生变化时回调
 const getC2 = () => {
   //请求二级分类数据方法
   categoryStore.getC2(categoryStore.c1Id);
   //清空二级，三级分类数据
   categoryStore.c2Id = '';
   categoryStore.c3Id = '';
   categoryStore.c3Arr = [];
 }
 //:当二级分类发生变化时回调
 const getC3 = () => {
   //请求三级分类数据方法
   categoryStore.getC3(categoryStore.c2Id);
   //清空三级分类数据
   categoryStore.c3Id = '';
 }
 //当组件销毁时，重置分类仓库数据
 onBeforeUnmount(() => {
  categoryStore.$reset()
 })

 //接受父组件的场景值
 defineProps(['scene'])
</script>

<style scoped>

</style>