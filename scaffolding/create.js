import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const superAdminStructure = {
    src: {
        components: {
            SuperAdmin: {
                Dashboard: ['AdminOverview.jsx', 'StatsCard.jsx', 'ActivityLogs.jsx', 'SystemNotifications.jsx'],
                BusinessManagement: ['BusinessList.jsx', 'BusinessDetail.jsx', 'CreateBusinessForm.jsx', 'AssignModules.jsx'],
                UserManagement: ['UserList.jsx', 'UserDetail.jsx', 'RoleManager.jsx', 'AccessControl.jsx'],
                ModuleManagement: ['ModuleList.jsx', 'CreateModuleForm.jsx', 'ModuleDetail.jsx', 'ApproveRequests.jsx'],
                AnalyticsReports: ['BusinessAnalytics.jsx', 'UserActivity.jsx', 'RevenueReports.jsx', 'CustomReports.jsx'],
                Approvals: ['ModuleRequests.jsx', 'BusinessApproval.jsx', 'UserVerification.jsx'],
                Settings: ['PlatformSettings.jsx', 'SubscriptionManagement.jsx', 'NotificationSettings.jsx', 'AuditLogs.jsx'],
            },
        },
        pages: [
            'SuperAdminDashboard.jsx',
            'BusinessManagementPage.jsx',
            'UserManagementPage.jsx',
            'ModuleManagementPage.jsx',
            'AnalyticsPage.jsx',
            'SettingsPage.jsx',
        ],
        utils: ['adminHelpers.js', 'permissions.js', 'analyticsUtils.js', 'constants.js'],
    },
};

const storeManagerStructure = {
    src: {
        components: {
            ProductCatalog: {
                ProductListing: ['ProductCard.jsx', 'ProductGrid.jsx', 'ProductTable.jsx', 'ProductSearchFilter.jsx'],
                ProductDetail: ['ProductDetailView.jsx', 'ImageGallery.jsx', 'PricingInfo.jsx', 'StockStatus.jsx', 'RelatedProducts.jsx'],
                ProductManagement: ['AddProductForm.jsx', 'EditProductForm.jsx', 'CategoryManager.jsx', 'BulkUpload.jsx', 'InventoryTracker.jsx'],
                AttributesVariants: ['VariantSelector.jsx', 'CustomAttributes.jsx', 'OptionManager.jsx'],
                ReviewsRatings: ['ReviewList.jsx', 'ReviewItem.jsx', 'RatingSummary.jsx'],
                Promotions: ['DiscountManager.jsx', 'PromoBanner.jsx', 'SpecialOffers.jsx'],
                AdminDashboard: ['ProductOverview.jsx', 'InventoryStatus.jsx', 'CatalogAnalytics.jsx', 'SearchProductAdmin.jsx'],
            },
        },
        pages: [
            'ProductPage.jsx',
            'ProductDetailPage.jsx',
            'AddProductPage.jsx',
            'AdminCatalogPage.jsx',
        ],
        utils: ['productHelpers.js', 'inventoryUtils.js', 'pricingCalculations.js', 'constants.js'],
    },
};
function createStructure(basePath, obj) {
    if (Array.isArray(obj)) {
        obj.forEach((file) => {
            const filePath = path.join(basePath, file);
            fs.writeFileSync(filePath, '', 'utf8');
        });
    } else {
        Object.entries(obj).forEach(([key, value]) => {
            const dirPath = path.join(basePath, key);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            createStructure(dirPath, value);
        });
    }
}

const projectRoot = path.join(__dirname, 'project');
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot);
}

createStructure(projectRoot, storeManagerStructure);

console.log('Project structure created successfully!');