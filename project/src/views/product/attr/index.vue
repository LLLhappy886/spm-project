<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0;">
      <div v-show="scene">
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id === ''" @click="addAttr">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="150px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{row}">
              <el-tag v-for="(item,index) in row.attrValueList" :key="index" :type="index === 0 ? 'primary' : 'success'" style="margin-right: 5px;">{{item.valueName}}></el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template #="{row}">
              <el-button type="primary" size="default" @click="updateAttr(row)" icon="Edit"></el-button>
              <el-popconfirm :title="`确认删除${row.attrName}吗？`" @confirm="deleteAttr(row.id)" width="200px">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!scene">
        <!-- 添加属性修改属性结构 -->
          <el-form inline>
            <el-form-item label="属性名称">
              <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName === ''" @click="addAttrValue">添加属性值</el-button>
          <el-button type="default" size="default" @click="sceneChange">取消</el-button>
          <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
            <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
            <el-table-column label="属性值名称">
              <template #="{row, $index}">
                <el-input :ref="(vc:any) => inputAttr[$index] = vc" v-if="row.flag" @blur="changeLook(row, $index)" placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
                <div v-else @click="changeEdit(row, $index)" >{{ row.valueName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template #="{$index}">
                <el-button type="danger" size="default" @click="attrParams.attrValueList.splice($index, 1)" icon="Delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length === 0">保存</el-button>
          <el-button type="default" size="default" @click="sceneChange">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  //引入watch
  import { watch, ref, reactive, nextTick} from 'vue'
  //引入接口方法
  import { reqAddOrUpdateAttr, reqAttr, reqDeleteAttr } from '../../../api/product/attr'
  //获取分类仓库
  import useCategoryStore from '../../../store/modules/category'
  import type { AttrList, AttrObj, AttrResponseData, AttrValueObj, } from '../../../api/product/attr/type'
  import { ElMessage } from 'element-plus'
  //收集新增属性值
  const attrParams = reactive<AttrObj>({
    attrName: '',
    categoryId: '',
    categoryLevel: 3,
    attrValueList: [

    ]
  })
  //定义一个数组存储对应的组件实例el-input
  let inputAttr = ref<any>([])
  //定义card组件内容切换的变量
  const scene = ref<boolean>(true);
  //card组件内容切换方法
  const sceneChange = () => {
    scene.value = !scene.value;
  }
  const categoryStore = useCategoryStore()
  //存储已有的属性与属性值
  const attrList = ref<AttrList>([])
  //监听分类3的变化
  watch(() => categoryStore.c3Id, () => {
        //清空已有的属性值
        attrList.value = []
        //保证得有分类3的id
        if (categoryStore.c3Id === '') return;
        //获取属性值
        getAttr();
        
      })
  //获取已有属性值的方法
  const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    let res: AttrResponseData = await reqAttr( c1Id, c2Id, c3Id);
    if (res.code === 200) {
      attrList.value = res.data;
    }
  }
  //新增属性的方法
  const addAttr = () => {
    //清空属性值
    Object.assign(attrParams,
    {attrName: '',
    //获取分类3的id
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: [],
    })
    //card组件内容切换
    sceneChange();
  }
  //新增属性值的方法
  const addAttrValue = () => {
    attrParams.attrValueList.push({
      valueName: '',
      //控制编辑/查看状态的标识
      flag: true,
    })
    //添加时默认聚焦
    nextTick(() => {
      inputAttr.value[attrParams.attrValueList.length - 1].focus();
    })
  }
  //修改属性值的方法
  const updateAttr = (row: AttrObj) => {
    //card组件内容切换
    sceneChange();
    //赋值属性值,深拷贝避免操作原对象
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  }
  //删除属性值的方法
  const deleteAttr = (id: number) => {
    //删除属性值
    attrList.value.splice(attrList.value.findIndex(item => item.id === id), 1);
    //发送请求
    reqDeleteAttr(id).then(res => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        //重新获取属性值
        getAttr();
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败'
        })
      }
    })

  }
  //保存按钮的回调
  const save = async () => {
    //只有属性值不为空才发送请求
    if (attrParams.attrValueList.length === 0 && attrParams.attrName === '') {
      ElMessage({
        type: 'error',
        message: '属性值不能为空'
      })
      return;
    }
    //发送请求
    const res: any = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
      //card组件内容切换
      sceneChange();
      //提示成功
      ElMessage({
        type: 'success',
        message: attrParams.id ? '修改成功' : '添加成功'
      })
      //刷新属性值
      getAttr();
      
    }else {
      ElMessage({
        type: 'error',
        message: attrParams.id ? '修改失败' : '添加失败'
      })
    }
  }
  //
  const flagChange = (row: AttrValueObj) => {
    //切换编辑/查看状态
    row.flag = !row.flag;
  }
  const changeEdit = (row: AttrValueObj, $index: number) => {
    //切换编辑状态
    flagChange(row);
    //nextTick：响应式数据更新后再执行
    nextTick(() => {
      //聚焦输入框
      inputAttr.value[$index].focus();
    })

  }
  const changeLook = (row: AttrValueObj, $index: number) => {
    //非空校验
    if (row.valueName === '') {
      //删除空属性值
      //attrParams.attrValueList.splice($index, 1);
      ElMessage({
        type: 'error',
        message: '属性值名称不能为空'
      })
      return;
    }
    //去重
    let repeat = attrParams.attrValueList.find((item, index) => {
      if (item.valueName === row.valueName && index !== $index) {
        ElMessage({
          type: 'error',
          message: '属性值名称不能重复'
        })
        return true;
      }
    }); 
    if (repeat) return;
    //切换查看状态
    flagChange(row);
  }
</script>

<style scoped>

</style>