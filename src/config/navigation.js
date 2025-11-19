/**
 * 导航配置文件
 * 集中管理 Header 导航数据
 */

export const navigationConfig = [
  {
    id: "product",
    label: "Product",
    type: "link", // link | dropdown
    href: "/product",
  },
  {
    id: "use-cases",
    label: "Use Cases",
    type: "dropdown",
    items: [
      {
        id: "developers",
        title: "For Developers",
        description: "Build faster with AI",
        href: "/use-cases/developers",
        icon: "code", // 可选：图标标识
      },
      {
        id: "enterprise",
        title: "For Enterprise",
        description: "Scale with confidence",
        href: "/use-cases/enterprise",
        icon: "building",
      },
      {
        id: "startups",
        title: "For Startups",
        description: "Grow your business",
        href: "/use-cases/startups",
        icon: "rocket",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    type: "link",
    href: "/pricing",
  },
  {
    id: "resources",
    label: "Resources",
    type: "dropdown",
    items: [
      {
        id: "documentation",
        title: "Documentation",
        description: "Guides and API references",
        href: "/resources/docs",
        icon: "book",
      },
      {
        id: "blog",
        title: "Blog",
        description: "Latest news and updates",
        href: "/resources/blog",
        icon: "newspaper",
      },
      {
        id: "community",
        title: "Community",
        description: "Join the conversation",
        href: "/resources/community",
        icon: "users",
      },
    ],
  },
];

/**
 * 如果需要从后端获取导航数据，可以使用这个函数
 * @returns {Promise<Array>}
 */
export async function fetchNavigationFromAPI() {
  try {
    // const response = await fetch('/api/navigation');
    // const data = await response.json();
    // return data;

    // 暂时返回本地配置
    return Promise.resolve(navigationConfig);
  } catch (error) {
    console.error("Failed to fetch navigation:", error);
    return navigationConfig; // 降级到本地配置
  }
}
