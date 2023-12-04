import { Category } from "../domain/category";
import { Mapper } from "../../../shared/infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class CategoryMap implements Mapper<Category> {
  public static toPersistence(category: Category): any {
    return {
      category_id: category.id.toString(),
      title: category.title.value,
    };
  }

  public static toDomain(raw: any): Category {
    const categoryOrError = Category.create(
      {
        title: raw.title,
      },
      new UniqueEntityID(raw.category_id)
    );

    categoryOrError.isFailure
      ? console.log(categoryOrError.getErrorValue())
      : "";

    return categoryOrError.isSuccess ? categoryOrError.getValue() : null;
  }
}
