"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const init_1 = require("./init");
const models_1 = require("../models");
const seedDatabase = async () => {
    try {
        await (0, init_1.initializeDatabase)();
        // Check if data already exists
        const existingOrgs = await models_1.Organization.count();
        if (existingOrgs > 0) {
            console.log('Database already seeded, skipping...');
            return;
        }
        console.log('🌱 Seeding database...');
        // Create organizations
        const org1 = await models_1.Organization.create({
            name: 'Brussels Plumbing Services',
            email: 'info@brusselsplumbing.be',
            phone: '+32 2 555 12 34',
            website: 'www.brusselsplumbing.be',
            address: 'Rue de la Montagne 45',
            city: 'Brussels',
        });
        const org2 = await models_1.Organization.create({
            name: 'Brussels Electrical Experts',
            email: 'contact@brusselselectric.be',
            phone: '+32 2 555 23 45',
            website: 'www.brusselselectric.be',
            address: 'Avenue Louise 210',
            city: 'Brussels',
        });
        const org3 = await models_1.Organization.create({
            name: 'Brussels Renovation & Heating',
            email: 'hello@brusselsservice.be',
            phone: '+32 2 555 34 56',
            website: 'www.brusselsservice.be',
            address: 'Boulevard Anspach 32',
            city: 'Brussels',
        });
        const org4 = await models_1.Organization.create({
            name: 'Brussels Painter & Decor',
            email: 'office@brusspainter.be',
            phone: '+32 2 555 45 67',
            website: 'www.brusspainter.be',
            address: 'Rue des Bouchers 12',
            city: 'Brussels',
        });
        const org5 = await models_1.Organization.create({
            name: 'Brussels Locksmith Solutions',
            email: 'service@brusselslock.be',
            phone: '+32 2 555 56 78',
            website: 'www.brusselslock.be',
            address: 'Rue Royale 128',
            city: 'Brussels',
        });
        // Create contacts
        const contact1 = await models_1.Contact.create({
            firstName: 'Luc',
            lastName: 'Dupont',
            email: 'luc.dupont@brusselsplumbing.be',
            phone: '+32 472 11 22 33',
            organizationId: org1.id,
            position: 'Geschäftsführer',
            status: 'active',
            tags: 'plumber,local,brussels',
            notes: 'Spezialisiert auf Notfälle und Rohrbruchreparaturen.',
        });
        const contact2 = await models_1.Contact.create({
            firstName: 'Elise',
            lastName: 'Vermeulen',
            email: 'elise.vermeulen@brusselselectric.be',
            phone: '+32 472 22 33 44',
            organizationId: org2.id,
            position: 'Projektleiterin',
            status: 'active',
            tags: 'electrician,installation',
            notes: 'Fokus auf Gebäudeinstallation und Sicherheitsprüfungen.',
        });
        const contact3 = await models_1.Contact.create({
            firstName: 'Mauro',
            lastName: 'De Smet',
            email: 'mauro.desmet@brusselsservice.be',
            phone: '+32 472 33 44 55',
            organizationId: org3.id,
            position: 'Servicekoordinator',
            status: 'active',
            tags: 'heating,renovation',
            notes: 'Verwaltet Renovierungen, Heizung und Wartung.',
        });
        const contact4 = await models_1.Contact.create({
            firstName: 'Sophie',
            lastName: 'Lebrun',
            email: 'sophie.lebrun@brusspainter.be',
            phone: '+32 472 44 55 66',
            organizationId: org4.id,
            position: 'Betriebsleiterin',
            status: 'active',
            tags: 'painter,decor',
            notes: 'Bietet Innen- und Außenanstriche für Wohn- und Geschäftsgebäude.',
        });
        const contact5 = await models_1.Contact.create({
            firstName: 'Thomas',
            lastName: 'Martens',
            email: 'thomas.martens@brusselslock.be',
            phone: '+32 472 55 66 77',
            organizationId: org5.id,
            position: 'Schlüsseltechniker',
            status: 'active',
            tags: 'locksmith,emergency',
            notes: '24/7 Notfalldienst für Türöffnungen und Sicherheitslösungen.',
        });
        // Create tickets
        await models_1.ServiceTicket.create({
            title: 'Leck in Badezimmerleitung reparieren',
            description: 'Dringend: Rohrbruch im Badezimmer, Wasser tropft.',
            contactId: contact1.id,
            status: 'open',
            priority: 'urgent',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            assignedTo: 'Plumbing Team Brussels',
        });
        await models_1.ServiceTicket.create({
            title: 'Küche neu verkabeln',
            description: 'Elektriker benötigt für neue Herdanschlüsse und Steckdosen.',
            contactId: contact2.id,
            status: 'in_progress',
            priority: 'high',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            assignedTo: 'Electrical Team Brussels',
        });
        await models_1.ServiceTicket.create({
            title: 'Heizungswartung und Thermostattausch',
            description: 'Regelmäßige Wartung für Zentralheizung und neues Thermostat.',
            contactId: contact3.id,
            status: 'open',
            priority: 'medium',
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            assignedTo: 'Renovation & Heating Team',
        });
        await models_1.ServiceTicket.create({
            title: 'Treppenhaus neu streichen',
            description: 'Neuer Anstrich für das Treppenhaus im Gebäude an der Rue Royale.',
            contactId: contact4.id,
            status: 'open',
            priority: 'medium',
            dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
            assignedTo: 'Painter & Decor Team',
        });
        await models_1.ServiceTicket.create({
            title: 'Notöffnung Wohnungstür',
            description: 'Schlüssel wurde verloren, Tür muss heute geöffnet werden.',
            contactId: contact5.id,
            status: 'open',
            priority: 'high',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            assignedTo: 'Locksmith Response Team',
        });
        // Create appointments
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowEnd = new Date(tomorrow);
        tomorrowEnd.setHours(tomorrowEnd.getHours() + 1);
        await models_1.Appointment.create({
            title: 'Kickoff Meeting',
            description: 'Projektstart mit Acme Corp',
            contactId: contact1.id,
            startDate: tomorrow,
            endDate: tomorrowEnd,
            location: 'Konferenzraum B',
            type: 'meeting',
        });
        // Create activity notes
        await models_1.ActivityNote.create({
            contactId: contact1.id,
            content: 'Telefongespräch: Kundenfreundlich, möchte neues Projekt starten',
            type: 'call',
        });
        await models_1.ActivityNote.create({
            contactId: contact2.id,
            content: 'Email-Austausch: Budgetgenehmigung erhalten',
            type: 'email',
        });
        console.log('✓ Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};
exports.seedDatabase = seedDatabase;
// Run seed if executed directly
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(() => process.exit(0))
        .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
exports.default = exports.seedDatabase;
