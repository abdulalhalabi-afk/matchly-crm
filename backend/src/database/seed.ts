import { initializeDatabase } from './init';
import { Organization, Contact, ServiceTicket, Appointment, ActivityNote } from '../models';

export const seedDatabase = async (): Promise<void> => {
  try {
    await initializeDatabase();

    // Check if data already exists
    const existingOrgs = await Organization.count();
    if (existingOrgs > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('🌱 Seeding database...');

    // Create organizations
    const org1 = await Organization.create({
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+49 30 123456',
      website: 'www.acme.com',
      address: 'Main Street 1',
      city: 'Berlin',
    });

    const org2 = await Organization.create({
      name: 'TechStart GmbH',
      email: 'info@techstart.de',
      phone: '+49 40 987654',
      website: 'www.techstart.de',
      address: 'Tech Park 10',
      city: 'Hamburg',
    });

    // Create contacts
    const contact1 = await Contact.create({
      firstName: 'Max',
      lastName: 'Müller',
      email: 'max.mueller@acme.com',
      phone: '+49 30 111111',
      organizationId: org1.id,
      position: 'Geschäftsführer',
      status: 'active',
      tags: 'vip,partner',
      notes: 'Wichtiger Geschäftspartner',
    });

    const contact2 = await Contact.create({
      firstName: 'Sandra',
      lastName: 'Schmidt',
      email: 'sandra.schmidt@acme.com',
      phone: '+49 30 222222',
      organizationId: org1.id,
      position: 'Projektmanagerin',
      status: 'active',
      tags: 'project-lead',
    });

    const contact3 = await Contact.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@techstart.de',
      phone: '+49 40 333333',
      organizationId: org2.id,
      position: 'CTO',
      status: 'lead',
      tags: 'tech',
    });

    // Create tickets
    await ServiceTicket.create({
      title: 'Website überarbeiten',
      description: 'Homepage soll neues Design bekommen',
      contactId: contact1.id,
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignedTo: 'Team A',
    });

    await ServiceTicket.create({
      title: 'API-Integration',
      description: 'Rest API in Kundenportal integrieren',
      contactId: contact3.id,
      status: 'open',
      priority: 'urgent',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      assignedTo: 'Team B',
    });

    // Create appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(tomorrowEnd.getHours() + 1);

    await Appointment.create({
      title: 'Kickoff Meeting',
      description: 'Projektstart mit Acme Corp',
      contactId: contact1.id,
      startDate: tomorrow,
      endDate: tomorrowEnd,
      location: 'Konferenzraum B',
      type: 'meeting',
    });

    // Create activity notes
    await ActivityNote.create({
      contactId: contact1.id,
      content: 'Telefongespräch: Kundenfreundlich, möchte neues Projekt starten',
      type: 'call',
    });

    await ActivityNote.create({
      contactId: contact2.id,
      content: 'Email-Austausch: Budgetgenehmigung erhalten',
      type: 'email',
    });

    console.log('✓ Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Run seed if executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default seedDatabase;
