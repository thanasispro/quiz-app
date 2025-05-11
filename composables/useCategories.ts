import { ref } from 'vue';
import htmlIcon from '/assets/images/icon-html.svg';
import cssIcon from '/assets/images/icon-css.svg';
import jsIcon from '/assets/images/icon-js.svg';
import accessibilityIcon from '/assets/images/icon-accessibility.svg';

export const useCategories = () => {
  // Helper function to properly format category names
  const formatCategoryName = (category: string): string => {
    if (!category) return '';
    
    const categoryMap: Record<string, string> = {
      'html': 'HTML',
      'css': 'CSS',
      'javascript': 'JavaScript',
      'accessibility': 'Accessibility'
    };
    
    return categoryMap[category.toLowerCase()] || 
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };
  
  // Get the appropriate icon for a category
  const getCategoryIcon = (category: string): string | undefined => {
    if (!category) return undefined;
    
    const lowerCategory = category.toLowerCase();
    if (lowerCategory === 'html') return htmlIcon;
    if (lowerCategory === 'css') return cssIcon;
    if (lowerCategory === 'javascript') return jsIcon;
    if (lowerCategory === 'accessibility') return accessibilityIcon;
    return htmlIcon; // Default fallback
  };
  
  // Get background color for category icon
  const getCategoryColor = (category: string): string => {
    if (!category) return 'transparent';
    
    const lowerCategory = category.toLowerCase();
    if (lowerCategory === 'html') return '#FFF1E9'; // orange-50
    if (lowerCategory === 'css') return '#E0FDEF'; // green-1000
    if (lowerCategory === 'javascript') return '#EBF0FF'; // blue-50
    if (lowerCategory === 'accessibility') return '#F6E7FF'; // purple-100
    return 'transparent'; // Default fallback
  };

  return {
    formatCategoryName,
    getCategoryIcon, 
    getCategoryColor
  };
};
