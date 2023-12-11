import { Category } from "../domain/category";
import { CategoryTitle } from "../domain/categoryTitle";
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
    const titleOrError = CategoryTitle.create({ value: raw.title });
    if (titleOrError.isFailure) return null;

    const categoryOrError = Category.create(
      {
        title: titleOrError.getValue(),
      },
      new UniqueEntityID(raw.category_id)
    );

    categoryOrError.isFailure
      ? console.log(categoryOrError.getErrorValue())
      : "";

    return categoryOrError.isSuccess ? categoryOrError.getValue() : null;
  }

  public static toDTO(category: Category): string {
    return category.title.value;
  }
}
