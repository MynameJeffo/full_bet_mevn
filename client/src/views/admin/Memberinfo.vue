<template>
  <div id="app">
    <center><h3 class="title col-4">Member Info Admin</h3></center>
    <b-button
      @click="dtCreateClick(fetchedData)"
      class="create-member-info float-right"
      variant="success"
      >Add new</b-button
    >
    <br />
    <br />
    <DataTable
      id="memberInfo-table"
      :header-fields="headerFields"
      :sort-field="sortField"
      :sort="sort"
      :data="fetchedData || []"
      :is-loading="isLoading"
      :css="datatableCss"
      not-found-msg="Items not found"
      @onUpdate="dtUpdateSort"
      trackBy="firstName"
    >
      <input
        slot="actions"
        slot-scope="fetchedData"
        type="button"
        class="btn btn-info"
        value="Edit"
        @click="dtEditClick(fetchedData)"
      />
      <!-- <Pagination
        slot="pagination"
        :page="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        :css="paginationCss"
        @onUpdate="changePage"
        @updateCurrentPage="updateCurrentPage"
      /> -->
      <!-- <div class="items-per-page" slot="ItemsPerPage">
        <label>Items per page</label>
        <ItemsPerPageDropdown
          :list-items-per-page="listItemsPerPage"
          :items-per-page="itemsPerPage"
          :css="itemsPerPageCss"
          @onUpdate="updateItemsPerPage"
        />
      </div> -->
      <div slot="ClubInfoDetails">
        click Edit for details...
        <!-- <b-list-group v-for="(item, key) in fetchedData" :key="key">
          <b-list-group-item v-for="(clubDetail, key) in item.clubInfo" :key="key">
            {{ clubDetail.clubName }}: {{clubDetail.clubId}}
          </b-list-group-item>
        </b-list-group> -->
      </div>
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

.create-member-info {
  margin-right: 8vw;
}

#memberInfo-table {
  width: 85vw;
  float: left;
  margin-left: 8vw;
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

/* Pagination CSS */
#v-datatable-light-pagination {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 300px;
  height: 30px;
}

#v-datatable-light-pagination .pagination-item {
  width: 30px;
  margin-right: 5px;
  font-size: 16px;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item.selected {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn {
  background-color: transparent;
  outline: none;
  border: none;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item .page-btn:hover {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.65;
}
/* END PAGINATION CSS */

/* ITEMS PER PAGE DROPDOWN CSS */
.item-per-page-dropdown {
  background-color: transparent;
  min-height: 30px;
  border: 1px solid #337ab7;
  border-radius: 5px;
  color: #337ab7;
}
.item-per-page-dropdown:hover {
  cursor: pointer;
}
/* END ITEMS PER PAGE DROPDOWN CSS */
</style>

<script>
import Spinner from "vue-simple-spinner";
import { DataTable } from "v-datatable-light";
import orderBy from "lodash.orderby";
import MemberInfoDetailsEditModal from "./MemberInfoDetailsEditModal.vue";
import MemberInfoDetailsCreateModal from "./MemberInfoDetailsCreateModal.vue";
// import { mapState, mapGetters } from "vuex";
// import store from "../../store/store.js";
import axios from "axios";

const initialData = [
  {
    clubName: "Lucca",
    clubId: "Lin"
  },
  {
    clubName: "Zahid",
    clubId: "Werner"
  },
  {
    clubName: "Gabriel",
    clubId: "Griffiths"
  },
  {
    clubName: "Talha",
    clubId: "Tucker"
  },
  {
    clubName: "Aariz",
    clubId: "Piper"
  },
  {
    clubName: "Macsen",
    clubId: "Schultz"
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
      fetchClubInfo: [],
      headerFields: [
        // "__slot:checkboxes",
        {
          name: "username",
          label: "User Name",
          sortable: true
        },
        {
          name: "email",
          label: "Email",
          sortable: true
        },
        {
          name: "password",
          label: "Password",
          sortable: true
        },
        {
          name: "clubInfo",
          label: "Club Info",
          customElement: "ClubInfoDetails",
          sortable: true
        },
        "__slot:actions"
      ],
      // data: initialData.slice(0, 10),
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
      sortField: "firstName",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 16
    };
  },
  methods: {
    // dtEditClick: props => alert("Click props:" + JSON.stringify(props)),
    async fetchClubInfoOfMember() {
      let fetchClubInfoAPI = "http://localhost:9000/api/getmemberInfo";
      const respondData = await axios.get(fetchClubInfoAPI);
      this.fetchedData = respondData.data;
      console.log(this.fetchedData);
    },
    dtEditClick: function(props) {
      let editData = props.rowData
      console.log("edit data", editData);
      this.$modal.show(
        MemberInfoDetailsEditModal,
        {
          id: editData._id,
          email: editData.email,
          username: editData.username,
          password: editData.password,
          clubInfo: editData.clubInfo
        },
        {
          height: "auto"
        },
        {
          // "before-close": event => {
          //   console.log("this will be called before the modal closes");
          // }
        }
      );
    },
    dtCreateClick: function(props) {
      console.log("fuckin" + JSON.stringify(props));

      this.$modal.show(
        MemberInfoDetailsCreateModal,
        {
          text: props
        },
        {
          height: "auto"
        },
        {
          // "before-close": event => {
          //   console.log("this will be called before the modal closes");
          // }
        }
      );
    },
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
