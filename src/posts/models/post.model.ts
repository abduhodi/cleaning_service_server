import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: '',
  })
  content_uz: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: '',
  })
  content_ru: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: '',
  })
  content_en: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    set(val: string) {
      this.setDataValue('category_id', parseInt(val));
    },
  })
  category_id: number;

  @BelongsTo(() => Category, {
    foreignKey: 'category_id',
    targetKey: 'id',
    as: 'category',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  category: Category;
}
