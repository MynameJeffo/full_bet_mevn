<template>
  <div id="app">
    <h3 class="title">Club Member Information</h3>
    <DataTable
      id="memberInfo-table"
      :header-fields="headerFields"
      :sort-field="sortField"
      :sort="sort"
      :data="fetchedData || []"
      :is-loading="isLoading"
      :css="datatableCss"
      not-found-msg="Items not found"
      trackBy="clubName"
    >
      <Spinner slot="spinner" />
    </DataTable>
  </div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app .title {
  margin-top: 4vh;
}

#app .items-per-page {
  height: 100%;
  display: flex;
  align-items: center;
  color: #337ab7;
}

#app .items-per-page label {
  margin: 0 15px;
}

#memberInfo-table {
  width: 70vw;
  float: left;
  margin-left: 15vw;
}

/* Datatable CSS */
#v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light .header-item:hover {
  color: #ed9b19;
}

#v-datatable-light .header-item.no-sortable {
  cursor: default;
}
#v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

#v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}

#v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

#v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

#v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

#v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

#v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}

#v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}

#v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}

#v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}

#v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
/* End Datatable CSS */
</style>

<script>
import Spinner from "vue-simple-spinner";
import { DataTable } from "v-datatable-light";
import orderBy from "lodash.orderby";
// import { mapState, mapGetters } from "vuex";
import store from "../store/store.js";
import axios from "axios";

const initialData = [
  {
    clubName: "Jockey Club",
    clubId: "123123"
  },
  {
    clubName: "Super Club",
    clubId: "3232323"
  },
  {
    clubName: "Swimming Club",
    clubId: "00222"
  }
];

export default {
  name: "app",
  components: {
    DataTable,
    // ItemsPerPageDropdown,
    // Pagination,
    Spinner
  },
  mounted() {
    // if (this.$store.state.isLoggedIn == false) {
    //   this.$router.push("/login");
    //   console.log("please login");
    // }
    // TODO: for development disable redirect
    this.fetchClubInfoOfMember();
  },
  data: function() {
    return {
      fetchedData: null,
      headerFields: [
        // "__slot:checkboxes",
        {
          name: "clubName",
          label: "Club Name",
          sortable: true
        },
        {
          name: "clubId",
          label: "Club ID",
          sortable: true
        }
        // ,
        // "__slot:actions"
      ],
      datatableCss: {
        table: "table table-bordered table-hover table-striped table-center",
        th: "header-item",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow up",
        arrowDown: "arrow down",
        footer: "footer"
      },
      paginationCss: {
        paginationItem: "pagination-item",
        moveFirstPage: "move-first-page",
        movePreviousPage: "move-previous-page",
        moveNextPage: "move-next-page",
        moveLastPage: "move-last-page",
        pageBtn: "page-btn"
      },
      itemsPerPageCss: {
        select: "item-per-page-dropdown"
      },
      isLoading: false,
      sort: "asc",
      sortField: "clubName",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 16
    };
  },
  methods: {
    async fetchClubInfoOfMember() {
      let fetchClubInfoAPI = "http://localhost:9000/api/getmemberInfo";
      const respondData = await axios.get(fetchClubInfoAPI, {
        params: {
          email: store.getters.getLoginId,
          getClubInfo: true
        }
      });
      this.fetchedData = respondData.data[0].clubInfo;
    },

    dtEditClick: props => alert("Click props:" + JSON.stringify(props)),

    dtUpdateSort: function({ sortField, sort }) {
      const sortedData = orderBy(initialData, [sortField], [sort]);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end);
      console.log("load data based on new sort", this.currentPage);
    },

    updateItemsPerPage: function(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      if (itemsPerPage >= initialData.length) {
        this.data = initialData;
      } else {
        this.data = initialData.slice(0, itemsPerPage);
      }
      console.log("load data with new items per page number", itemsPerPage);
    },

    changePage: function(currentPage) {
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = initialData.slice(start, end);
      console.log("load data for the new page", currentPage);
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
      console.log("update current page without need to load data", currentPage);
    }
  }
};
</script>
