<template>
  <section>
    <div class="row">
      <div class="col-md-4">
        <form class="form-inline">
          <div class="form-group">
            <label for="draw" class="control-label">Show</label>
            <select
              name
              id="draw"
              class="form-control ml-sm-3"
              v-model="draw"
              @change="showEntries"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">30</option>
            </select>
          </div>
        </form>
      </div>
      <div class="col-md-4 offset-4 text-right" @keyup="search">
        <form class="form-inline">
          <div class="form-group w-100">
            <label for="search" class="control-label">Search</label>
            <input type="text" id="search" class="form-control flex-grow-1 ml-sm-3" />
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.name"
                @click.prevent="sort(column.orderAble, column.name, orderBy === 'asc' ? 'desc' : 'asc')"
              >
                {{ column.label }}
                <i
                  v-if="column.name === orderByColumn && orderBy == 'asc'"
                  class="fas fa-angle-down"
                ></i>
                <i
                  v-if="column.name === orderByColumn && orderBy == 'desc'"
                  class="fas fa-angle-up"
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <slot v-if="customRow"></slot>
            <tr v-else v-for="row in rows" :key="row.id">
              <td v-for="column in columns" :key="column.name">{{ _.get(row, column.name) }}</td>
            </tr>
            <tr v-if="rows.length === 0">
              <td :colspan="columns.length">No Result Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <span>Showing {{rows.length === 0 ? 0 : 1}} to {{rows.length}} of tatal {{meta.total}}</span>
      </div>
      <div class="col-md-6">
        <nav>
          <ul class="pagination pagination-sm pagination-gutter justify-content-end">
            <li class="page-item page-indicator" :class="{ disabled: links.prev === null }">
              <a class="page-link" href="javascript:void()" @click.prevent="prev()">
                <i class="icon-arrow-left"></i>
              </a>
            </li>

            <li
              v-for="page in items"
              :key="page.label"
              class="page-item"
              :class="{
                                active: page.active,
                                disabled: page.disable
                            }"
            >
              <span v-if="page.disable" class="disabled">...</span>
              <a
                v-else
                href="javascript:void()"
                class="page-link"
                @click.prevent="goto(page.label)"
                :class="{ active: page.active }"
              >{{ page.label }}</a>
            </li>

            <li class="page-item page-indicator" :class="{ disabled: links.next === null }">
              <a class="page-link" href="javascript:void()" @click.prevent="next()">
                <i class="icon-arrow-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    columns: null,
    customRow: false,
    url: null
  },
  data () {
    return {
      rows: [],
      draw: 10,
      orderByColumn: 'created_at',
      orderBy: "desc",
      links: {
        first: null,
        last: null,
        next: null,
        prev: null
      },
      meta: {
        current_page: null,
        last_page: null,
        path: null,
        per_page: null,
        to: null,
        total: null
      }
    };
  },
  mounted () {
    this.fetch(this.url);
  },
  computed: {
    items () {
      let valPrev =
        this.meta.current_page > 1 ? this.meta.current_page - 1 : 1;
      let valNext =
        this.meta.current_page < this.meta.total
          ? this.meta.current_page + 1
          : this.meta.total;
      let extraPrev = valPrev === 3 ? 2 : null;
      let extraNext =
        valNext === this.meta.total - 2 ? this.meta.total - 1 : null;
      let dotsBefore = valPrev > 2 ? 2 : null;
      let dotsAfter =
        valNext < this.meta.total - 1 ? this.meta.total - 1 : null;

      let output = [];

      for (let i = 1; i <= this.meta.last_page; i++) {
        if (
          [
            1,
            this.meta.total,
            this.meta.current_page,
            valPrev,
            valNext,
            extraPrev,
            extraNext,
            dotsBefore,
            dotsAfter
          ].includes(i)
        ) {
          output.push({
            label: i,
            active: this.meta.current_page === i,
            disable: [dotsBefore, dotsAfter].includes(i)
          });
        }
      }

      return output;
    }
  },
  methods: {
    fetch (url) {
      axios
        .get(url, { params: { order_by_column: this.orderByColumn, order_by: this.orderBy, draw: this.draw } })
        .then(res => res.data)
        .then(res => {
          this.rows = res.data;
          this.links = res.links;
          this.meta = res.meta;
        });
    },
    prev () {
      const prev =
        this.meta.current_page > 1 ? this.meta.current_page - 1 : 1;
      this.fetch(`${this.url}?page=${prev}`);
    },
    next () {
      const next =
        this.meta.current_page < this.meta.total
          ? this.meta.current_page + 1
          : this.meta.total;
      this.fetch(`${this.url}?page=${next}`);
    },
    goto (index) {
      this.fetch(`${this.url}?page=${index}`);
    },
    sort (orderAble, orderByColumn, orderBy) {
      if (!orderAble) {
        return;
      }
      axios
        .get(this.url, { params: { order_by_column: orderByColumn, order_by: orderBy, draw: this.draw } })
        .then(res => res.data)
        .then(res => {
          this.rows = res.data;
          this.links = res.links;
          this.meta = res.meta;
          this.orderBy = orderBy;
          this.orderByColumn = orderByColumn;
        });
    },
    search ($e) {
      const keyword = $e.target.value;
      axios
        .get(this.url, { params: { order_by_column: this.orderByColumn, order_by: this.orderBy, draw: this.draw, keyword: keyword } })
        .then(res => res.data)
        .then(res => {
          this.rows = res.data;
          this.links = res.links;
          this.meta = res.meta;
        });
    },
    showEntries () {
      axios
        .get(this.url, { params: { order_by_column: this.orderByColumn, order_by: this.orderBy, draw: this.draw } })
        .then(res => res.data)
        .then(res => {
          this.rows = res.data;
          this.links = res.links;
          this.meta = res.meta;
          //   this.draw = draw;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
th {
  cursor: pointer;
  .fas {
    margin-left: 10px;
    color: #999999 !important;
    vertical-align: middle;
  }
}
</style>
