<template>
    <a-card 
        style="margin-bottom: 50px; margin-top: 50px;"
        :bordered="false">

        <a-table 
            class="table-dark table-market-cap"
            :columns="columns" 
            :data-source="data" 
            :scroll="{ x: 1300, y: 1000 }">

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'N_name'">
                    <a-row>
                        <a-col 
                            :xs="4"
                            :sm="4"
                            :md="6"
                            :lg="10"
                            :xl="14"
                            :xxl="18">
                            {{ record.N_name }}<br />
                            <span class="text-small">{{ record.N_fullname }}</span>
                        </a-col>
                        <a-col 
                            :xs="4" 
                            :sm="4"
                            :md="4"
                            :lg="4"
                            :xl="4"
                            style="text-align: end; padding-right: 70px;"><MarketCap :value="record.marketcap" /></a-col>
                    </a-row>                    
                </template>

                <template v-if="column.key === 'operation'">
                    <a-button type="primary" @click="openDetail(record)">
                        Open
                    </a-button>
                </template>
            </template>

        </a-table>
    </a-card>

    <a-drawer
        class="drawer-dark"
        :width="500"
        title="Company details"
        placement="right"
        :visible="visible"
        @close="closeDetail" >

        <template #extra>
            <a-button style="margin-right: 8px" @click="closeDetail">Cancel</a-button>
        </template>

        <div 
            v-if="detail != null" 
            class="data-detail">

            <div class="box-content">
                <h3><a-typography-text type="warning">{{ detail.N_name }}</a-typography-text></h3>
            </div>
            
            <div class="content" style="padding-top: 20px;">
                <div class="title">Name</div>
                <div class="detail">{{ detail.N_shortname }} <br v-if="detail.N_shortname"> {{ detail.N_fullname }}</div>
            </div>

            <div class="content">
                <div class="title">URL</div>
                <div class="detail">
                    <a-typography-link v-if="detail.N_URL" :href="vertifyUrl(detail.N_URL)" target="_blank">{{ detail.N_URL }}</a-typography-link>
                    <b v-else> N/A</b>
                </div>
            </div>

            <div class="content">
                <div class="title">Market Cap</div>
                <div class="detail">{{ formatToCurrency(detail.marketcap) }}</div>
            </div>

            <div class="content">
                <div class="title">Company name</div>
                <div class="detail">{{ detail.N_COMPANY_T }} <br> {{ detail.N_COMPANY_E }}</div>
            </div>

            <div class="content">
                <div class="title">Business TH</div>
                <div class="detail">{{ detail.N_BUSINESS_TYPE_T }}</div>
            </div>

            <div class="content">
                <div class="title">Business EN</div>
                <div class="detail">{{ detail.N_BUSINESS_TYPE_E }}</div>
            </div>
        </div>
    </a-drawer>
</template>

<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref, nextTick } from 'vue';
import MarketCap from '@/components/MarketCap.vue';
import { number } from 'vue-types';

interface interDataItem {
    N_name: string;
    N_shortname: string;
    marketcap: number;
    N_COMPANY_T: string;
    N_COMPANY_E: string;
    N_URL: string;
    F_TYPE: string;
    N_BUSINESS_TYPE_E: string;
    N_BUSINESS_TYPE_T: string;
    N_fullname: string;
}

const apiDataUrl = 'https://stockradars.co/assignment/data.php';
const initLoading = ref<boolean>(true);
const visible = ref<boolean>(false);
const data = ref<interDataItem[]>([]);
const detail = ref<interDataItem | null>();

const columns: TableColumnsType = [
    { title: 'Company / Market Cap (Billion)', key: 'N_name', dataIndex: 'N_name', sorter: (a: interDataItem, b: interDataItem) => a.N_name.localeCompare(b.N_name) },
    { title: 'Detail', key: 'operation', fixed: 'right', width: 100 },
];

onMounted(() => {
    fetch(apiDataUrl)
        .then(res => res.json())
        .then(res => {
            initLoading.value = false;
            data.value = res;
        });
});

const formatToCurrency = (amount: number | null) => {
    if(amount){
        return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }
    return 'N/A';
}
const vertifyUrl = (url: string | null) => {
    if(url){
        if(/(http(s?)):\/\//i.test(url)){
            return url
        }
        return '//' + url;
    }
}
const openDetail = (item: interDataItem) => {
    detail.value = (item) ? item : null;
    visible.value = true;
}
const closeDetail = () => {
    detail.value = null;
    visible.value = false;
}

</script>

<style scoped>

</style>