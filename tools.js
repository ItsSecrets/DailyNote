function toJson() {
    // let jsonStr = "[{\"id\":\"0653\",\"text\":[\"ssmj369\",\"hnmj778\",\"ynmj258\",\"hnmj660\"],\"key\":\"SHOP_WECHAT\"},{\"id\":\"0930\",\"text\":[\"1\"],\"key\":\"URL_tableshareHall\"},{\"id\":\"0928\",\"text\":[\"1\"],\"key\":\"URL_tableshare\"},{\"id\":\"0779\",\"text\":[\"XLhunanmj\"],\"key\":\"WOAINFO\"},{\"id\":\"0652\",\"text\":[\"出版单位 三辰影库音像出版社\"],\"key\":\"PUBLISHING_UNIT\"},{\"id\":\"0651\",\"text\":[\"著作权人：北京闲徕互娱网络科技有限公司\"],\"key\":\"COPYRIGHT_OWNER\"},{\"id\":\"0650\",\"text\":[\"出版物号（ISBN）978-7-7979-0824-5\"],\"key\":\"ISBN\"},{\"id\":\"0649\",\"text\":[\"审批文号：新广出审[2016]2187号\"],\"key\":\"APPROVAL_NUMBER\"},{\"id\":\"0648\",\"text\":[\"文网游备字〔2016〕Ｍ-CBG 8629 号\"],\"key\":\"WENYOUWANG\"},{\"id\":\"0647\",\"text\":[\"软著登字第2016SR172900号\"],\"key\":\"SOFT_REG_NUMBER\"},{\"id\":\"0646\",\"text\":[\"京网文[2016]1755-215号\"],\"key\":\"JING_WANGWEN\"},{\"id\":\"0645\",\"text\":[\"京公网安备11010502031685\"],\"key\":\"JING_GONGANBEI\"}]";

    // console.log(JSON.parse(jsonStr));

    let jsonVar = [
        {
            id: '0653',
            text: [''],
            key: 'SHOP_WECHAT'
        },
        { id: '0930', text: ['1'], key: 'URL_tableshareHall' },
        { id: '0928', text: ['1'], key: 'URL_tableshare' },
        { id: '0779', text: ['XLhunanmj'], key: 'WOAINFO' },
        { id: '0652', text: [''], key: 'PUBLISHING_UNIT' },
        {
            id: '0651',
            text: [''],
            key: 'COPYRIGHT_OWNER'
        },
        { id: '0650', text: [''], key: 'ISBN' },
        {
            id: '0649',
            text: [''],
            key: 'APPROVAL_NUMBER'
        },
        {
            id: '0648',
            text: [''],
            key: 'WENYOUWANG'
        },
        {
            id: '0647',
            text: [''],
            key: 'SOFT_REG_NUMBER'
        },
        { id: '0646', text: [''], key: 'JING_WANGWEN' },
        {
            id: '0645',
            text: [''],
            key: 'JING_GONGANBEI'
        }
    ]
    

    console.log(JSON.stringify(jsonVar));
    
    
}

toJson()

