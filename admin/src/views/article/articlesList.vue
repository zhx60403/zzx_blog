<template>
    <el-table :data="articlesList">
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="createTime" label="时间"></el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button type="text" @click="toEditArticle(scope.row._id)">编辑</el-button>
                <el-button type="text" @click="enterDeleteArticle(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data(){
        return{
            articlesList:[]
        }
    },
    methods:{
        async getArticlesList(){
            let res = await this.$http.get('/crud/article')
            this.articlesList = res.data
        },
        toEditArticle(id){
            this.$router.push(`/editArticle/${id}`)
        },
        enterDeleteArticle(row){
            this.$confirm(`是否删除标题为 ${row.title} 这篇文章`,`提示`,{
                type: 'warning'
            }).then(()=>{
                this.deleteArticle(row._id)
            }).catch(()=>{
                this.$message(`取消删除`)
            })
        },
        async deleteArticle(id){
            let res = await this.$http.delete(`/crud/article/${id}`)
            if(res.status == 200){
                this.$message({
                    type: `success`,
                    message: `删除成功！`
                })
                this.getArticlesList()
            }
        }
    },
    created(){
        this.getArticlesList()
    }
}
</script>
