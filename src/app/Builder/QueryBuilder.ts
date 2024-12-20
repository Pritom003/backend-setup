import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(seachableFields: string[]) {
    const searchtem = this?.query?.searchTerm;
    if (searchtem) {
      this.modelQuery = this.modelQuery.find({
        $or: seachableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchtem, $options: 'i' },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }
  filter() {
    // copy
    const queryObj = { ...this.query };
    // exclude
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = (this.query.sort as string)?.split (',')?.join(' ') || '-cratedAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const page =Number(this?.query?.page)|| 1;
    const limit =Number(this?.query?.limit)|| 0;
    const skip = (page-1)*limit


    this.modelQuery=this.modelQuery.skip(skip).limit(limit)
return this 
}

fields (){
    const   fields = (this.query.fields as string)?.split (',')?.join(' ') 
    this.modelQuery=this.modelQuery.select(fields)

return this
}


}
export default QueryBuilder
