<template>
    <div class="container vh-100">
        <form action="" method="post">
            <div class="form-group" v-click-outside="close">
                <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    aria-describedby="helpId"
                    placeholder="Search restaurants and dishes"
                    @keyup.prevent="suggestion()"
                    @focus.prevent="suggestion()"
                    v-model="keyword"
                />
                <div
                    class="suggest-items animated fadeInUp"
                    v-if="seen && results != null"
                >
                    <ul v-show="results.length > 0">
                        <li
                            class="suggest-item animated fadeInUp"
                            v-for="result in results"
                            :key="result.category + result.id"
                        >
                            <router-link
                                :to="{ path: '/restaurant/' + result.slug }"
                                class="suggest-item-link"
                            >
                                <img
                                    :src="result.url"
                                    class="img-thumbnail ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                                    alt=""
                                    width="50"
                                />
                                <div class="suggest-item-detail">
                                    <span>{{ result.name }}</span>
                                    <small
                                        ><b>{{ result.category }}</b></small
                                    >
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <ul v-show="results.length === 0">
                        <li class="suggest-item animated fadeInUp">
                            No Result Found
                        </li>
                    </ul>
                </div>
                <!-- <small id="helpId" class="text-muted"
                    >Search for restaurants or dishes</small
                > -->
                <a
                    href=""
                    v-show="keyword != null"
                    @click.prevent="clearSearch()"
                >
                    <i class="fa fa-times" aria-hidden="true"></i>
                </a>
                <router-link to="/restaurants"> </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";

export default {
    components: {
        VueAutosuggest
    },
    data() {
        return {
            keyword: null,
            seen: false,
            results: []
        };
    },
    methods: {
        suggestion() {
            if (this.keyword !== null) {
                this.seen = true;
                if (this.keyword.length > 1) {
                    axios
                        .post("/api/search", { keyword: this.keyword })
                        .then(res => res.data)
                        .then(res => {
                            this.results = res.results;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.results = [];
                }
            }
        },
        clearSearch() {
            this.keyword = null;
            this.seen = false;
        },
        close() {
            this.seen = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 131px 15% 0px 15%;
}
.form-group {
    position: relative;
    .fa-times {
        position: absolute;
        right: 2%;
        font-size: 18px;
        top: 30%;
    }
    input:focus,
    input:active {
        border-radius: 0%;
    }
}
.suggest-items {
    position: absolute;
    // bottom: -275%;
    width: 100%;
    border: 1px solid #c8c8c8;
    border-top: 0;
    ul {
        .suggest-item {
            padding: 10px;
            .suggest-item-link {
                display: flex;
                .suggest-item-detail {
                    padding-left: 10px;
                    display: flex;
                    flex-flow: column;
                }
            }
            &:hover {
                background-color: #f8f9fa !important;
            }
        }
    }
}

element.style {
}
.img-thumbnail {
    padding: 0;
    background-color: transparent;
    border: 0;
}
</style>
