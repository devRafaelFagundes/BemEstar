export = buildFilter;
declare function buildFilter(query: any, role: any, userId: any): {
    professional: any;
    clients: {
        $in: any[];
    };
    createdAt: {
        $gte: Date;
        $lte: Date;
    };
    date: {
        $lte: Date;
        $gte: Date;
    };
    done: boolean;
};
//# sourceMappingURL=buildFilter.d.ts.map