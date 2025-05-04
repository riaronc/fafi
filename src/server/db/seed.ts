import { PrismaClient, CategoryType } from '@/server/db/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const testUserId = process.env.TEST_USER_ID;
  
  if (!testUserId) {
    console.error('TEST_USER_ID environment variable is not set');
    return;
  }

  const defaultCategories = [
    // Income categories
    {
      id: uuidv4(),
      name: 'Salary',
      type: 'INCOME' as CategoryType,
      bgColor: '#E8F5E9',  // Soft green background
      fgColor: '#2E7D32',  // Darker green icon
      icon: 'dollar-sign',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Gifts',
      type: 'INCOME' as CategoryType,
      bgColor: '#F3E5F5',  // Soft purple background
      fgColor: '#7B1FA2',  // Darker purple icon
      icon: 'gift',
      userId: testUserId,
    },
    
    // Expense categories
    {
      id: uuidv4(),
      name: 'Rent',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#FFEBEE',  // Soft red background
      fgColor: '#C62828',  // Darker red icon
      icon: 'home',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Eating Out',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#FFF3E0',  // Soft orange background
      fgColor: '#E65100',  // Darker orange icon
      icon: 'utensils',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Tech',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#E3F2FD',  // Soft blue background
      fgColor: '#1565C0',  // Darker blue icon
      icon: 'monitor',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Groceries',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#F1F8E9',  // Soft light green background
      fgColor: '#558B2F',  // Darker green icon
      icon: 'shopping-cart',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Home',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#EFEBE9',  // Soft brown background
      fgColor: '#4E342E',  // Darker brown icon
      icon: 'home',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Education',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#E8EAF6',  // Soft indigo background
      fgColor: '#283593',  // Darker indigo icon
      icon: 'book',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Entertainment',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#FCE4EC',  // Soft pink background
      fgColor: '#C2185B',  // Darker pink icon
      icon: 'film',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Taxi',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#FFF8E1',  // Soft amber background
      fgColor: '#FF8F00',  // Darker amber icon
      icon: 'car',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Charity',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#EDE7F6',  // Soft deep purple background
      fgColor: '#512DA8',  // Darker deep purple icon
      icon: 'heart',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Transport',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#ECEFF1',  // Soft blue grey background
      fgColor: '#455A64',  // Darker blue grey icon
      icon: 'car',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Shopping',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#FBE9E7',  // Soft deep orange background
      fgColor: '#D84315',  // Darker deep orange icon
      icon: 'shopping-bag',
      userId: testUserId,
    },
    {
      id: uuidv4(),
      name: 'Health',
      type: 'EXPENSE' as CategoryType,
      bgColor: '#E0F7FA',  // Soft cyan background
      fgColor: '#00838F',  // Darker cyan icon
      icon: 'heart',
      userId: testUserId,
    },
  ];

  console.log('Creating default categories...');
  
  // Delete existing categories first
  await prisma.categories.deleteMany({
    where: {
      userId: testUserId,
    },
  });

  // Create new categories
  for (const category of defaultCategories) {
    await prisma.categories.create({
      data: category,
    });
    console.log(`Created category: ${category.name}`);
  }

  console.log('Default categories created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 