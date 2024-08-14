import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm as string;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludedFields = ['sort', 'limit', 'page', 'fields', 'searchTerm'];
    excludedFields.forEach((field) => delete queryObject[field]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  productWithPriceRange() {
    const maxPrice = this.query.price as string;

    if (maxPrice) {
      const price = Number(maxPrice);

      if (!isNaN(price) && price > 0) {
        this.modelQuery = this.modelQuery.find({
          price: { $gt: 0, $lt: price },
        });
      }
    }

    return this;
  }

  sort() {
    const sort =
      (this.query.sort as string)?.split(',').join(' ') || 'createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 100;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const total = await this.modelQuery.clone().countDocuments();
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 100; // Consistent default limit
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      totalPage,
    };
  }
}

export default QueryBuilder;
