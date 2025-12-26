// Centralized mock data for the Shyft application

export interface Job {
    id: number;
    customer: string;
    customerEmail: string;
    address: string;
    tech: string;
    techId: number;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    time: string;
    priority: 'low' | 'medium' | 'high';
    serviceType: string;
    estimatedDuration: number; // minutes
    actualDuration?: number;
    revenue: number;
    notes?: string;
}

export interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'available' | 'on-job' | 'break' | 'driving' | 'offline';
    avatar: string;
    color: string;
    skills: string[];
    jobsCompleted: number;
    rating: number;
    phone: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalJobs: number;
    totalRevenue: number;
    since: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    content: string;
    rating: number;
    metric?: string;
}

export interface Integration {
    id: number;
    name: string;
    category: 'accounting' | 'payment' | 'communication' | 'crm' | 'other';
    logo: string;
    description: string;
    isConnected: boolean;
}

// Mock Jobs
export const mockJobs: Job[] = [
    {
        id: 1,
        customer: 'Acme Corp',
        customerEmail: 'contact@acmecorp.com',
        address: '1240 Market St, San Francisco, CA',
        tech: 'Mike Sanders',
        techId: 1,
        status: 'in-progress',
        time: '10:30 AM',
        priority: 'high',
        serviceType: 'HVAC Repair',
        estimatedDuration: 120,
        revenue: 450,
        notes: 'Customer reported AC not cooling properly'
    },
    {
        id: 2,
        customer: 'TechStart Inc',
        customerEmail: 'admin@techstart.io',
        address: '789 Innovation Way, Palo Alto, CA',
        tech: 'Sarah Kim',
        techId: 2,
        status: 'scheduled',
        time: '1:00 PM',
        priority: 'medium',
        serviceType: 'Electrical Inspection',
        estimatedDuration: 90,
        revenue: 320
    },
    {
        id: 3,
        customer: 'Global Systems',
        customerEmail: 'facilities@globalsys.com',
        address: '456 Enterprise Blvd, San Jose, CA',
        tech: 'John Davis',
        techId: 3,
        status: 'completed',
        time: '9:00 AM',
        priority: 'low',
        serviceType: 'Plumbing Maintenance',
        estimatedDuration: 60,
        actualDuration: 55,
        revenue: 180
    },
    {
        id: 4,
        customer: 'Local Business Co',
        customerEmail: 'owner@localbiz.com',
        address: '123 Main St, Oakland, CA',
        tech: 'Emily Rodriguez',
        techId: 4,
        status: 'scheduled',
        time: '3:30 PM',
        priority: 'medium',
        serviceType: 'General Maintenance',
        estimatedDuration: 45,
        revenue: 150
    },
    {
        id: 5,
        customer: 'Downtown Apartments',
        customerEmail: 'manager@dtapts.com',
        address: '890 Urban Ave, Berkeley, CA',
        tech: 'Mike Sanders',
        techId: 1,
        status: 'scheduled',
        time: '4:45 PM',
        priority: 'high',
        serviceType: 'Emergency Repair',
        estimatedDuration: 180,
        revenue: 575
    }
];

// Mock Team Members
export const mockTeam: TeamMember[] = [
    {
        id: 1,
        name: 'Mike Sanders',
        email: 'mike.s@shyft-demo.com',
        role: 'Senior Technician',
        status: 'on-job',
        avatar: 'MS',
        color: 'blue',
        skills: ['HVAC', 'Electrical', 'Plumbing'],
        jobsCompleted: 247,
        rating: 4.9,
        phone: '(555) 123-4567'
    },
    {
        id: 2,
        name: 'Sarah Kim',
        email: 'sarah.k@shyft-demo.com',
        role: 'Technician',
        status: 'available',
        avatar: 'SK',
        color: 'emerald',
        skills: ['Electrical', 'Solar Installation'],
        jobsCompleted: 183,
        rating: 4.8,
        phone: '(555) 234-5678'
    },
    {
        id: 3,
        name: 'John Davis',
        email: 'john.d@shyft-demo.com',
        role: 'Lead Technician',
        status: 'break',
        avatar: 'JD',
        color: 'purple',
        skills: ['Plumbing', 'HVAC', 'General Maintenance'],
        jobsCompleted: 312,
        rating: 4.95,
        phone: '(555) 345-6789'
    },
    {
        id: 4,
        name: 'Emily Rodriguez',
        email: 'emily.r@shyft-demo.com',
        role: 'Technician',
        status: 'driving',
        avatar: 'ER',
        color: 'cyan',
        skills: ['General Maintenance', 'Carpentry'],
        jobsCompleted: 156,
        rating: 4.7,
        phone: '(555) 456-7890'
    }
];

// Mock Customers
export const mockCustomers: Customer[] = [
    {
        id: 1,
        name: 'Acme Corp',
        email: 'contact@acmecorp.com',
        phone: '(555) 111-2222',
        address: '1240 Market St, San Francisco, CA',
        totalJobs: 45,
        totalRevenue: 18450,
        since: '2023-01-15'
    },
    {
        id: 2,
        name: 'TechStart Inc',
        email: 'admin@techstart.io',
        phone: '(555) 222-3333',
        address: '789 Innovation Way, Palo Alto, CA',
        totalJobs: 28,
        totalRevenue: 12800,
        since: '2023-03-22'
    }
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Jennifer Martinez',
        role: 'Operations Director',
        company: 'Bay Area Services',
        avatar: 'JM',
        content: 'Shyft reduced our dispatch time by 60% and our technicians love the mobile app. The ROI was immediate.',
        rating: 5,
        metric: '60% faster dispatch'
    },
    {
        id: 2,
        name: 'Robert Chen',
        role: 'CEO',
        company: 'QuickFix Pro',
        avatar: 'RC',
        content: 'We tried 4 different platforms. Shyft is the only one that actually works the way field service should.',
        rating: 5,
        metric: '4x competitor tested'
    },
    {
        id: 3,
        name: 'Amanda Williams',
        role: 'Field Manager',
        company: 'Metro Maintenance',
        avatar: 'AW',
        content: 'The automated routing alone saved us 15 hours per week. Our customers are happier and so is our team.',
        rating: 5,
        metric: '15 hrs/week saved'
    }
];

// Mock Integrations
export const mockIntegrations: Integration[] = [
    {
        id: 1,
        name: 'QuickBooks',
        category: 'accounting',
        logo: 'quickbooks',
        description: 'Sync jobs, invoices, and payments automatically',
        isConnected: true
    },
    {
        id: 2,
        name: 'Stripe',
        category: 'payment',
        logo: 'stripe',
        description: 'Accept credit cards and ACH payments',
        isConnected: true
    },
    {
        id: 3,
        name: 'Google Calendar',
        category: 'other',
        logo: 'google-calendar',
        description: 'Two-way calendar synchronization',
        isConnected: false
    },
    {
        id: 4,
        name: 'Slack',
        category: 'communication',
        logo: 'slack',
        description: 'Get real-time job notifications',
        isConnected: false
    },
    {
        id: 5,
        name: 'Salesforce',
        category: 'crm',
        logo: 'salesforce',
        description: 'Keep customer data in sync',
        isConnected: false
    }
];

// Statistics
export const mockStats = {
    todayRevenue: 2340,
    activeJobs: 4,
    teamOnField: 3,
    totalTeam: 4,
    avgResponseTime: 24, // minutes
    jobsCompletedToday: 8,
    jobsScheduledToday: 12,
    weeklyRevenue: 18450,
    monthlyRevenue: 72340,
    customerSatisfaction: 4.8,
    onTimeRate: 94,
    totalCustomers: 156,
    totalJobsCompleted: 2847
};

// Feature data for expanded features page
export interface Feature {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    benefits: string[];
    tags: string[];
}

export const mockFeatures: Feature[] = [
    {
        id: 'smart-dispatch',
        title: 'Smart Dispatch',
        description: 'AI-powered job assignment that considers technician skills, location, availability, and job priority to create optimal schedules.',
        category: 'Dispatch & Routing',
        icon: 'fa-brain',
        benefits: [
            'Reduce drive time by up to 40%',
            'Match jobs to skilled technicians automatically',
            'Handle last-minute changes instantly'
        ],
        tags: ['AI', 'Automation', 'Efficiency']
    },
    {
        id: 'route-optimization',
        title: 'Route Optimization',
        description: 'Real-time traffic integration and dynamic rerouting ensure technicians take the fastest path to every job.',
        category: 'Dispatch & Routing',
        icon: 'fa-route',
        benefits: [
            'Save 2-3 hours per technician daily',
            'Adapt to traffic in real-time',
            'Multi-stop route planning'
        ],
        tags: ['Navigation', 'Real-time', 'GPS']
    },
    {
        id: 'mobile-app',
        title: 'Mobile Tech App',
        description: 'Offline-first mobile experience for technicians with job details, customer info, time tracking, and photo capture.',
        category: 'Mobile Experience',
        icon: 'fa-mobile-screen',
        benefits: [
            'Works offline completely',
            'Instant job updates',
            'Photo and signature capture'
        ],
        tags: ['Mobile', 'Offline', 'iOS', 'Android']
    },
    {
        id: 'customer-portal',
        title: 'Customer Portal',
        description: 'Self-service booking, real-time technician tracking, and instant communication keep customers informed.',
        category: 'Customer Experience',
        icon: 'fa-users',
        benefits: [
            'Reduce phone calls by 70%',
            'Real-time ETA updates',
            'Easy online booking'
        ],
        tags: ['Self-service', 'Communication']
    },
    {
        id: 'automated-workflows',
        title: 'Automated Workflows',
        description: 'Trigger-based automation for notifications, follow-ups, invoicing, and more. Set it once, forget it forever.',
        category: 'Automation',
        icon: 'fa-gears',
        benefits: [
            'Send automatic confirmations',
            'Schedule follow-up visits',
            'Automate invoice generation'
        ],
        tags: ['Automation', 'Efficiency']
    },
    {
        id: 'inventory-management',
        title: 'Inventory Management',
        description: 'Track parts, materials, and equipment across technician trucks and warehouse locations.',
        category: 'Operations',
        icon: 'fa-boxes-stacked',
        benefits: [
            'Never run out of parts',
            'Track inventory by location',
            'Automatic reorder alerts'
        ],
        tags: ['Inventory', 'Tracking']
    },
    {
        id: 'payment-processing',
        title: 'Instant Payments',
        description: 'Accept credit cards, ACH, and digital wallets on-site. Get paid before you leave the job.',
        category: 'Financial',
        icon: 'fa-credit-card',
        benefits: [
            'Collect payment immediately',
            'Reduce outstanding invoices',
            'Automatic receipt generation'
        ],
        tags: ['Payments', 'Invoicing']
    },
    {
        id: 'team-collaboration',
        title: 'Team Collaboration',
        description: 'Built-in chat, notes, file sharing, and task management keep your team connected.',
        category: 'Team Management',
        icon: 'fa-comments',
        benefits: [
            'Share job notes instantly',
            'Attach photos and files',
            'Team-wide announcements'
        ],
        tags: ['Communication', 'Collaboration']
    },
    {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        description: 'Real-time reporting on revenue, technician performance, customer satisfaction, and operational efficiency.',
        category: 'Business Intelligence',
        icon: 'fa-chart-line',
        benefits: [
            'Track KPIs in real-time',
            'Identify top performers',
            'Spot trends early'
        ],
        tags: ['Analytics', 'Reporting']
    },
    {
        id: 'integrations',
        title: 'Integrations Hub',
        description: 'Connect with QuickBooks, Stripe, Google Calendar, Slack, and 50+ other tools you already use.',
        category: 'Integrations',
        icon: 'fa-plug',
        benefits: [
            'Sync data automatically',
            'Two-way integration',
            'API access for custom builds'
        ],
        tags: ['API', 'Integrations']
    },
    {
        id: 'custom-forms',
        title: 'Custom Forms',
        description: 'Create job-specific forms, checklists, and inspection reports with conditional logic and photo requirements.',
        category: 'Operations',
        icon: 'fa-list-check',
        benefits: [
            'Build forms in minutes',
            'Conditional field logic',
            'Photo requirements'
        ],
        tags: ['Forms', 'Customization']
    },
    {
        id: 'compliance-tools',
        title: 'Compliance & Safety',
        description: 'Safety checklists, certification tracking, and compliance reporting keep your team safe and certified.',
        category: 'Compliance',
        icon: 'fa-shield-halved',
        benefits: [
            'Track certifications',
            'Safety checklists',
            'Compliance reporting'
        ],
        tags: ['Safety', 'Compliance']
    }
];
