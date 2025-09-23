interface WebtoonCommon {
    title: string;
    createdDate: Date;
    updateDate: Date;
}

interface Episode extends WebtoonCommon {
    episodeNumber: number;
    seriesNumber: number;
}

interface Series extends WebtoonCommon {
    seriesNumber: number;
    author: string;
}

const episode: Episode = {
    title: "나 혼자도 레벨업 1화",
    createdDate: new Date(),
    updateDate: new Date(),
    episodeNumber: 1,
    seriesNumber:123,
};

const series: Series = {
    title: "나 혼자도 레벨업",
    createdDate: new Date(),
    updateDate: new Date(),
    seriesNumber: 123,
    author: "천자작가",
};
