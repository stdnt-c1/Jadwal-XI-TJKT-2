import { getDbClient } from './config.js';

const ENV = process.env.NODE_ENV || 'development';

export class AssignmentService {
  static async getAll() {
    const db = await getDbClient();
    
    try {
      if (ENV === 'development') {
        const assignments = await db.all('SELECT * FROM assignments ORDER BY created_at DESC');
        return { data: assignments, error: null };
      } else {
        return await db
          .from('assignments')
          .select('*')
          .order('created_at', { ascending: false });
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  static async create(assignment) {
    const db = await getDbClient();
    
    try {
      if (ENV === 'development') {
        const result = await db.run(
          'INSERT INTO assignments (subject, details, assigned_date, due_date) VALUES (?, ?, ?, ?)',
          [assignment.subject, assignment.details, assignment.assigned_date, assignment.due_date]
        );
        return { data: { id: result.lastID, ...assignment }, error: null };
      } else {
        return await db
          .from('assignments')
          .insert([assignment])
          .select();
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  static async update(id, assignment) {
    const db = await getDbClient();
    
    try {
      if (ENV === 'development') {
        await db.run(
          'UPDATE assignments SET subject = ?, details = ?, assigned_date = ?, due_date = ?, status = ? WHERE id = ?',
          [assignment.subject, assignment.details, assignment.assigned_date, assignment.due_date, assignment.status, id]
        );
        return { data: { id, ...assignment }, error: null };
      } else {
        return await db
          .from('assignments')
          .update(assignment)
          .eq('id', id)
          .select();
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  static async delete(id) {
    const db = await getDbClient();
    
    try {
      if (ENV === 'development') {
        await db.run('DELETE FROM assignments WHERE id = ?', [id]);
        return { error: null };
      } else {
        return await db
          .from('assignments')
          .delete()
          .eq('id', id);
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}
